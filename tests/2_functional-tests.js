const chaiHttp = require("chai-http");
const chai = require("chai");
const { assert } = chai;
const server = require("../server");

chai.use(chaiHttp);

// HTML Fields
// issue_title: string
// issue_text: string
// created_by: string
// assigned_to (optional): string
// status_text (optional): string

// {project}
// _id: string
// issue_title: string
// issue_text: string
// status_text: string
// created_by: string
// assigned_to: string
// created_on: string (date/time)
// updated_on: string (date/time)
// open: boolean

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
    chai
      .request(server)
      .keepOpen()
      .get(endpoint)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.ok);
        assert.fail("GET request not implemented yet");
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
        assert.fail("GET request not implemented yet");
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
        assert.fail("GET request not implemented yet");
        done();
      });
  });

  test("POST creates an issue with required fields", (done) => {
    // Required: issue_title, issue_text, created_by
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
        assert.fail("POST request not implemented yet");
        done();
      });
  });

  test("POST creates an issue with optional fields defaulted", (done) => {
    /// Required: issue_title, issue_text, created_by
    // Optional:
    // created_on (date/time)
    // updated__on (date/time)
    // open (boolean, true by default when open, false when closed)
    // _id
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
        assert.fail("POST request not implemented yet");
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
        assert.equal(res.status, httpsResponse.badRequest);
        assert.fail("POST request not implemented yet");
        done();
      });
  });

  test("PUT updates issue fields and updated_on timestamp when a single field is updated", (done) => {
    // Update by _id
    // update updated_on
    let successMessage = { result: "successfully updated", _id: _id };
    let updateIssue = {
      _id: "5871dda29faedc3491ff93bb",
      open: false,
    };
    chai
      .request(server)
      .keepOpen()
      .put(endpoint)
      .type("form")
      .send(updateIssue)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.ok);
        assert.fail("PUT request not implemented yet");
        done();
      });
  });

  test("PUT updates issue fields and updated_on timestamp when multiple fields are updated", (done) => {
    // Update by _id
    // update updated_on
    let successMessage = { result: "successfully updated", _id: _id };
    let updateIssue = {
      _id: "5871dda29faedc3491ff93bb",
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
        assert.equal(res.status, httpsResponse.ok);
        assert.fail("PUT request not implemented yet");
        done();
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
        assert.equal(res.status, httpsResponse.badRequest);
        assert.fail("PUT request not implemented yet");
        done();
      });
  });

  test("PUT returns an error when no update fields are provided", (done) => {
    // Update by _id
    // update updated_on
    let errorMessage = { error: "no update field(s) sent", _id: _id };
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
        assert.equal(res.status, httpsResponse.badRequest);
        assert.fail("PUT request not implemented yet");
        done();
      });
  });

  test("PUT returns an error when _id is invalid", (done) => {
    let errorMessage = { error: "could not update", _id: _id };
    let updateIssue = {
      _id: "invalid id",
      open: true,
    };
    chai
      .request(server)
      .keepOpen()
      .put(endpoint)
      .type("form")
      .send(updateIssue)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.badRequest);
        assert.fail("PUT request not implemented yet");
        done();
      });
  });

  test("DELETE successfully deletes an issue with a valid _id", (done) => {
    let successMessage = { result: "successfully deleted", _id: _id };
    let deleteIssue = {
      _id: "5871dda29faedc3491ff93bb",
    };
    chai
      .request(server)
      .keepOpen()
      .delete(endpoint)
      .type("form")
      .send(deleteIssue)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.noContent);
        assert.fail("DELETE request not implemented yet");
        done();
      });
  });

  test("DELETE returns an error when _id is invalid", (done) => {
    let errorMessage = { error: "could not delete", _id: _id };
    let deleteIssue = {
      _id: "invalid id",
    };
    chai
      .request(server)
      .keepOpen()
      .delete(endpoint)
      .type("form")
      .send(deleteIssue)
      .end((err, res) => {
        assert.equal(res.status, httpsResponse.badRequest);
        assert.fail("DELETE request not implemented yet");
        done();
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
        assert.equal(res.status, httpsResponse.badRequest);
        assert.fail("DELETE request not implemented yet");
        done();
      });
  });
});
