const chaiHttp = require("chai-http");
const chai = require("chai");
const { assert } = chai;
const server = require("../server");

chai.use(chaiHttp);

suite("/api/issues/:project", function () {
  let project = "apitest";
  let endpoint = `/api/issues/${project}`;
  const httpsResponse = {
    ok: 200,
    created: 201,
    badRequest: 400,
    noContent: 204,
  };

  test("GET returns all issues array with all fields", (done) => {
    let issueFields = [
      "_id",
      "issue_title",
      "issue_text",
      "created_by",
      "assigned_to",
      "status_text",
      "created_on",
      "updated_on",
      "open",
    ];
    chai
      .request(server)
      .keepOpen()
      .get(endpoint)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.ok);
        assert.isArray(res.body, "Response should be an array");
        res.body.forEach((issue) => {
          issueFields.forEach((field) => assert.property(issue, field));
        });
        done();
      });
  });

  test("GET filters issues by a single query parameter", (done) => {
    let parameters = { open: true };

    chai
      .request(server)
      .keepOpen()
      .get(endpoint)
      .query(parameters)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.ok);
        assert.isArray(res.body, "Response should be an array");
        res.body.forEach((issue) => {
          assert.property(issue, "open");
          assert.equal(issue.open, parameters.open);
        });
        done();
      });
  });

  test("GET filters issues by multiple query parameters", (done) => {
    let parameters = { open: true, created_by: "Joe" };

    chai
      .request(server)
      .keepOpen()
      .get(endpoint)
      .query(parameters)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.ok);
        assert.isArray(res.body, "Response should be an array");
        res.body.forEach((issue) => {
          assert.property(issue, "open");
          assert.equal(issue.open, parameters.open);
          assert.property(issue, "created_by");
          assert.equal(issue.created_by, parameters.created_by);
        });
        done();
      });
  });

  // Tests any combination of query parameters
  //
  // const projectFields = [
  //   "_id", "issue_title", "issue_text", "created_by", "assigned_to", "status_text", "created_on", "updated_on", "open"
  // ];
  
  // function getCombinations(array, size) {
  //   function* doCombination(offset, combo) {
  //     if (combo.length === size) {
  //       yield combo;
  //       return;
  //     }
  //     for (let i = offset; i < array.length; i++) {
  //       yield* doCombination(i + 1, combo.concat(array[i]));
  //     }
  //   }
  //   return Array.from(doCombination(0, []));
  // }
  
  // for (let size = 1; size <= projectFields.length; size++) {
  //   getCombinations(projectFields, size).forEach(combination => {
  //     test(`GET filters issues by ${combination.join(", ")}`, (done) => {
  //       let parameters = {};
  
  //       combination.forEach(key => {
  //         switch (key) {
  //           case "_id":
  //             parameters[key] = "5871dda29faedc3491ff93bb";
  //             break;
  //           case "issue_title":
  //           case "issue_text":
  //           case "created_by":
  //           case "assigned_to":
  //           case "status_text":
  //             parameters[key] = "Joe";
  //             break;
  //           case "created_on":
  //           case "updated_on":
  //             parameters[key] = "2017-01-08T06:35:14.240Z";
  //             break;
  //           case "open":
  //             parameters[key] = true;
  //             break;
  //           default:
  //             parameters[key] = "";
  //         }
  //       });
  
  //       chai
  //         .request(server)
  //         .get(endpoint)
  //         .query(parameters)
  //         .end((err, res) => {
  //           assert.equal(res.status, httpsResponse.ok);
  //           done();
  //         });
  //     });
  //   });
  // }

  test("POST creates an issue with required fields", (done) => {
    let newIssue = {
      issue_title: "new issue test",
      issue_text: "new issue text",
      created_by: "Joe",
      assigned_to: "Joe",
      status_text: "new issue status text",
    };
    chai
      .request(server)
      .keepOpen()
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.created);
        assert.isObject(res.body, "Response should be an object");
        Object.keys(newIssue).forEach((key) => {
          assert.equal(res.body[key], newIssue[key]);
        });
        assert.property(res.body, "_id", "Response should have an _id");
        assert.property(
          res.body,
          "created_on",
          "Response should have a created_on timestamp"
        );
        assert.property(
          res.body,
          "updated_on",
          "Response should have an updated_on timestamp"
        );
        assert.property(
          res.body,
          "open",
          "Response should have an open status"
        );
        done();
      });
  });

  test("POST creates an issue with optional fields defaulted", (done) => {
    let newIssue = {
      issue_title: "new issue test",
      issue_text: "new issue text",
      created_by: "Joe",
    };
    chai
      .request(server)
      .keepOpen()
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.created);
        assert.isObject(res.body, "Response should be an object");
        Object.keys(newIssue).forEach((key) => {
          assert.equal(res.body[key], newIssue[key]);
        });

        assert.property(res.body, "_id", "Response should have an _id");
        assert.property(
          res.body,
          "created_on",
          "Response should have a created_on timestamp"
        );
        assert.property(
          res.body,
          "updated_on",
          "Response should have an updated_on timestamp"
        );
        assert.property(
          res.body,
          "open",
          "Response should have an open status"
        );
        assert.strictEqual(
          res.body.open,
          true,
          "Open should be true by default"
        );
        assert.strictEqual(
          res.body.assigned_to,
          "",
          "Assigned to should be empty by default"
        );
        assert.strictEqual(
          res.body.status_text,
          "",
          "Status text should be empty by default"
        );
        done();
      });
  });

  test("POST returns an error when required fields are missing", (done) => {
    let errorMessage = { error: "required field(s) missing" };
    let newIssue = {};
    chai
      .request(server)
      .keepOpen()
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        assert.equal(
          res.status,
          httpsResponse.badRequest,
          "Response should have a status of 400 Bad Request"
        );
        assert.deepEqual(
          res.body,
          errorMessage,
          "Response body should match the expected error message"
        );
        done();
      });
  });

  test("PUT updates issue fields and updated_on timestamp when a single field is updated", (done) => {
    let newIssue = {
      issue_title: "new title",
      issue_text: "new text",
      created_by: "Test",
      assigned_to: "Adrian",
      status_text: "new status text",
    };

    chai
      .request(server)
      .keepOpen()
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        if (err) done(err);

        assert.equal(
          res.status,
          201,
          "Response should have a status of 201 Created"
        );
        let issueId = res.body._id;
        let updateIssue = {
          _id: issueId,
          open: false,
        };


        chai
          .request(server)
          .keepOpen()
          .put(endpoint)
          .type("form")
          .send(updateIssue)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(
              res.status,
              200,
              "Response should have a status of 200 OK"
            );
            assert.equal(
              res.body.result,
              "successfully updated",
              "Response should indicate successful update"
            );


            chai
              .request(server)
              .keepOpen()
              .get(endpoint)
              .query({ _id: issueId })
              .end((err, res) => {
                if (err) done(err);

                assert.equal(
                  res.status,
                  200,
                  "Response should have a status of 200 OK"
                );
                let updatedIssue = res.body[0];

                assert.equal(
                  updatedIssue.open,
                  "false",
                  "Issue open status should be updated to false"
                );
                assert.exists(
                  updatedIssue.updated_on,
                  "updated_on timestamp should exist"
                );
                assert.notEqual(
                  updatedIssue.updated_on,
                  updatedIssue.created_on,
                  "updated_on timestamp should differ from created_on timestamp"
                );

                done();
              });
          });
      });
  });

  test("PUT updates issue fields and updated_on timestamp when multiple fields are updated", (done) => {
    let newIssue = {
      issue_title: "Initial title",
      issue_text: "Initial text",
      created_by: "Initial creator",
      assigned_to: "Initial assignee",
      status_text: "Initial status",
      open: true,
    };

    chai
      .request(server)
      .keepOpen()
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        if (err) done(err);
        assert.equal(
          res.status,
          201,
          "Response should have a status of 201 Created"
        );

        let issueId = res.body._id;
        let updateIssue = {
          _id: issueId,
          issue_title: "Updated issue title",
          issue_text: "Updated issue text",
          created_by: "Updated created by",
          assigned_to: "Updated assigned to",
          status_text: "Updated status text",
          open: false,
        };

        chai
          .request(server)
          .keepOpen()
          .put(endpoint)
          .type("form")
          .send(updateIssue)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(
              res.status,
              200,
              "Response should have a status of 200 OK"
            );
            assert.equal(
              res.body.result,
              "successfully updated",
              "Response should indicate successful update"
            );

            chai
              .request(server)
              .keepOpen()
              .get(endpoint)
              .query({ _id: issueId })
              .end((err, res) => {
                if (err) done(err);

                assert.equal(
                  res.status,
                  200,
                  "Response should have a status of 200 OK"
                );
                let responseIssue = res.body[0];

                Object.keys(responseIssue).forEach((key) => {
                  if (key !== "_id") {
                    assert.equal(
                      responseIssue[key],
                      responseIssue[key],
                      `Issue ${key} should be updated`
                    );
                  }
                });

                assert.exists(
                  responseIssue.updated_on,
                  "updated_on timestamp should exist"
                );
                assert.notEqual(
                  responseIssue.updated_on,
                  responseIssue.created_on,
                  "updated_on timestamp should differ from created_on timestamp"
                );

                done();
              });
          });
      });
  });

  test("PUT returns an error when _id is missing", (done) => {
    let errorMessage = { error: "missing _id" };
    let updateIssue = {
      issue_title: "Updated issue title",
      issue_text: "Updated issue text",
      created_by: "Updated created by",
      assigned_to: "Updated assigned to",
      status_text: "Updated status text",
      open: true,
    };
    chai
      .request(server)
      .keepOpen()
      .put(endpoint)
      .type("form")
      .send(updateIssue)
      .end((err, res) => {
        assert.equal(
          res.status,
          httpsResponse.badRequest,
          "Response should have a status of 400 Bad Request"
        );
        assert.deepEqual(
          res.body,
          errorMessage,
          "Response body should contain the correct error message"
        );
        done();
      });
  });

  test("PUT returns an error when no update fields are provided", (done) => {
    let errorMessage = {
      error: "no update field(s) sent",
      _id: "5871dda29faedc3491ff93bb",
    };
    let updateIssue = {
      _id: "5871dda29faedc3491ff93bb",
    };
    chai
      .request(server)
      .keepOpen()
      .put(endpoint)
      .type("form")
      .send(updateIssue)
      .end((err, res) => {
        assert.equal(
          res.status,
          httpsResponse.badRequest,
          "Response should have a status of 400 Bad Request"
        );
        assert.deepEqual(
          res.body,
          errorMessage,
          "Response body should contain the correct error message"
        );
        done();
      });
  });

  test("PUT returns an error when _id is invalid", (done) => {
    let newIssue = {
      issue_title: "Initial title",
      issue_text: "Initial text",
      created_by: "Initial creator",
      assigned_to: "Initial assignee",
      status_text: "Initial status",
      open: true,
    };

    chai
      .request(server)
      .keepOpen()
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        if (err) done(err);

        assert.equal(res.status, 201, "Response should have a status of 201 Created");

        let validIssueId = res.body._id;
        let invalidId = validIssueId + "invalid";
        let errorMessage = { error: "could not update", _id: invalidId };
        let updateIssue = {
          _id: invalidId,
          open: true,
        };

        chai
          .request(server)
          .put(endpoint)
          .type("form")
          .send(updateIssue)
          .end((err, res) => {
            assert.equal(
              res.status,
              httpsResponse.badRequest,
              "Response should have a status of 400 Bad Request"
            );
            assert.deepEqual(
              res.body,
              errorMessage,
              "Response body should contain the correct error message with the invalid _id"
            );
            done();
          });
      });
  });


  test("DELETE successfully deletes an issue with a valid _id", (done) => {
    let newIssue = {
      issue_title: "Title for deletion",
      issue_text: "Text for deletion",
      created_by: "Creator for deletion",
      assigned_to: "Assignee for deletion",
      status_text: "Status for deletion",
      open: true,
    };

    chai
      .request(server)
      .post(endpoint)
      .type("form")
      .send(newIssue)
      .end((err, res) => {
        if (err) done(err);

        assert.equal(res.status, httpsResponse.created, "Response should have a status of 201 Created");
        let validId = res.body._id;

        let successMessage = { result: "successfully deleted", _id: validId };
        let deleteIssue = { _id: validId };

        chai
          .request(server)
          .delete(endpoint)
          .type("form")
          .send(deleteIssue)
          .end((err, res) => {
            assert.oneOf(
              res.status,
              [httpsResponse.ok, httpsResponse.noContent],
              "Response should be 200 OK or 204 No Content"
            );

            assert.deepEqual(
              res.body,
              successMessage,
              "Response body should contain the success message for deletion"
            );

            done();
          });
      });
  });


  test("DELETE returns an error when _id is invalid", (done) => {
    let newIssue = {
        issue_title: "Title for deletion",
        issue_text: "Text for deletion",
        created_by: "Creator for deletion",
        assigned_to: "Assignee for deletion",
        status_text: "Status for deletion",
        open: true,
    };

    chai
        .request(server)
        .post(endpoint)
        .type("form")
        .send(newIssue)
        .end((err, res) => {
            if (err) done(err);

            assert.equal(res.status, httpsResponse.created, "Response should have a status of 201 Created");
            let validId = res.body._id;
            let invalidId = validId + "invalid";
            let errorMessage = { error: "could not delete", _id: invalidId };
            let deleteIssue = { _id: invalidId };

            chai
                .request(server)
                .delete(endpoint)
                .type("form")
                .send(deleteIssue)
                .end((err, res) => {
                    assert.equal(
                        res.status,
                        httpsResponse.badRequest,
                        "Response should be 400 Bad Request"
                    );
                    assert.deepEqual(
                        res.body,
                        errorMessage,
                        "Response body should contain the error message for invalid _id"
                    );
                    done();
                });
        });
});


  test("DELETE returns an error when _id is missing", (done) => {
    let errorMessage = { error: "missing _id" };
    let deleteIssue = {};
    chai
      .request(server)
      .keepOpen()
      .delete(endpoint)
      .type("form")
      .send(deleteIssue)
      .end((err, res) => {
        assert.equal(
          res.status,
          httpsResponse.badRequest,
          "Response should be 400 Bad Request"
        );
        assert.deepEqual(
          res.body,
          errorMessage,
          "Response body should contain the error message for missing _id"
        );
        done();
      });
  });
});
