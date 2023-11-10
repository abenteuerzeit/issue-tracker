"use strict";

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let project = req.params.project;

      const generateObjectId = () => {
        const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
        const objectId =
          timestamp +
          "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, () => {
              return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase();

        return objectId;
      };
      const generateMockIssues = (count) => {
        const mockIssues = [];
        for (let i = 0; i < count; i++) {
          mockIssues.push({
            _id: generateObjectId(),
            issue_title: "Issue title " + i,
            issue_text: "Issue text for issue " + i,
            created_on: new Date().toISOString(),
            updated_on: new Date().toISOString(),
            created_by: "User" + i,
            assigned_to: "User" + (i % 2 === 0 ? i : "Joe"),
            open: i % 2 === 0,
            status_text: i % 2 === 0 ? "In QA" : "Resolved",
          });
        }
        return mockIssues;
      };
      res.json(generateMockIssues(10));
    })

    .post(function (req, res) {
      let project = req.params.project;
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
