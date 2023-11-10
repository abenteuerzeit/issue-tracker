

// Single parameter filter
const projectFields = [
    "_id", "issue_title", "issue_text", "created_by", "assigned_to", "status_text", "created_on", "updated_on", "open"
  ];
  
  projectFields.forEach(key => {
    test(`GET filters issues by ${key}`, (done) => {
      let value;
      switch (key) {
        case "_id":
          value = "5871dda29faedc3491ff93bb";
          break;
        case "issue_title":
        case "issue_text":
        case "created_by":
        case "assigned_to":
        case "status_text":
          value = "Joe";
          break;
        case "created_on":
        case "updated_on":
          value = "2017-01-08T06:35:14.240Z";
          break;
        case "open":
          value = true;
          break;
        default:
          value = "";
      }
  
      let parameters = {};
      parameters[key] = value;
  
      chai
        .request(server)
        .keepOpen()
        .get(endpoint)
        .query(parameters)
        .end((err, res) => {
          assert.equal(res.status, httpsResponse.ok);
          res.body.forEach(issue => {
            if (issue.hasOwnProperty(key)) {
              assert.equal(issue[key], value);
            }
          });
          done();
        });
    });
  });

// Many parameter filter

  function getCombinations(array, size) {
    function* doCombination(offset, combo) {
      if (combo.length === size) {
        yield combo;
        return;
      }
      for (let i = offset; i < array.length; i++) {
        yield* doCombination(i + 1, combo.concat(array[i]));
      }
    }
    return Array.from(doCombination(0, []));
  }
  
  for (let size = 2; size <= projectFields.length; size++) {
    getCombinations(projectFields, size).forEach(combination => {
      test(`GET filters issues by ${combination.join(", ")}`, (done) => {
        let parameters = {};
  
        combination.forEach(key => {
          switch (key) {
            case "_id":
              parameters[key] = "5871dda29faedc3491ff93bb";
              break;
            case "issue_title":
            case "issue_text":
            case "created_by":
            case "assigned_to":
            case "status_text":
              parameters[key] = "Joe";
              break;
            case "created_on":
            case "updated_on":
              parameters[key] = "2017-01-08T06:35:14.240Z";
              break;
            case "open":
              parameters[key] = true;
              break;
            default:
              parameters[key] = "";
          }
        });
  
        chai
          .request(server)
          .get(endpoint)
          .query(parameters)
          .end((err, res) => {
            assert.equal(res.status, httpsResponse.ok);
            done();
          });
      });
    });
  }