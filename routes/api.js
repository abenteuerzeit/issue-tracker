"use strict";

const { getIssues, createIssue, updateIssue, deleteIssue } = require("./db");

module.exports = function(app) {
    app.route("/api/issues/:project")

        .get(function(req, res) {
            let project = req.params.project;
            const issues = getIssues(project, req.query);
            res.status(200).send(issues);
        })

        .post(function(req, res) {
            let project = req.params.project;
            if (!req.body.issue_title || !req.body.issue_text || !req.body.created_by) {
                return res.status(400).send({ error: 'required field(s) missing' });
            }
            const newIssue = createIssue(project, req.body);
            res.status(201).send(newIssue);
        })

        .put(function(req, res) {
            let project = req.params.project;
            const { _id } = req.body;
            if (!_id) {
                return res.status(400).send({
                    error: 'missing _id'
                });
            }

            if (Object.keys(req.body).length <= 1) {
                return res.status(400).send({ error: 'no update field(s) sent', '_id': _id });
            }

            const result = updateIssue(project, req.body);

            if (result.error) {
                res.status(400).send({ error: result.error, '_id': _id });
            } else {
                res.status(200).send(result);
            }
        })

        .delete(function(req, res) {
            let project = req.params.project;
            const { _id } = req.body;

            if (!_id) {
                return res.status(400).send({ error: 'missing _id' });
            }

            const result = deleteIssue(project, _id);

            if (result.error) {
                res.status(400).send({ error: result.error, '_id': _id });
            } else {
                res.status(200).send(result);
            }
        });
};
