const chaiHttp = require('chai-http');
const chai = require('chai');
const { assert } = chai;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/issues/:project', () => {
        test('GET returns all issues array with all fields', (done) => {
            // 200 Ok

            assert.fail('GET request not implemented yet');
            done();
        });

        test('GET filters issues by a single query parameter', (done) => {
            // 200 Ok
            assert.fail('GET request not implemented yet');
            done();
        });

        test('GET filters issues by multiple query parameters', (done) => {
            // 200 Ok
            assert.fail('GET request not implemented yet');
            done();
        });

        test('POST creates an issue with required fields', (done) => {
            // 201 Created
            // Required: issue_title, issue_text, created_by
            assert.fail('POST request not implemented yet');
            done();
        });

        test('POST creates an issue with optional fields defaulted', (done) => {
            // 201 Created
            /// Required: issue_title, issue_text, created_by
            // Optional: 
                // created_on (date/time)
                // updated__on (date/time)
                // open (boolean, true by default when open, false when closed)
                // _id
            assert.fail('POST request not implemented yet');
            done();
        });

        test('POST returns an error when required fields are missing', (done) => {
            // 400 Bad Request
            // return  { error: "required field(s) missing" }
            assert.fail('POST request not implemented yet');
            done();
        });

        test('PUT updates issue fields and updated_on timestamp when a single field is updated', (done) => {
            // 200 Ok
            // Update by _id
            // return  {  result: "successfully updated", "_id": _id }
            // update updated_on
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT updates issue fields and updated_on timestamp when multiple fields are updated', (done) => {
            // 200 Ok
            // Update by _id
            // return {  result: "successfully updated", "_id": _id }
            // update updated_on
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT returns an error when _id is missing', (done) => {
            // 400 Bad Request
            // return { error: "missing _id" }
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT returns an error when no update fields are provided', (done) => {
            // 400 Bad Request
            // return { error: "no update field(s) sent", "_id": _id }
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT returns an error when _id is invalid', (done) => {
            // 400 Bad Request
            // return { error: "could not update", "_id": _id }
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('DELETE successfully deletes an issue with a valid _id', (done) => {
            // 204 No Content
            // return { result: "successfully deleted", "_id": _id }
            assert.fail('DELETE request not implemented yet');
            done();
        });

        test('DELETE returns an error when _id is invalid', (done) => {
            // 400 Bad Request
            // return { error: "could not delete", "_id": _id }
            assert.fail('DELETE request not implemented yet');
            done();
        });

        test('DELETE returns an error when _id is missing', (done) => {
            // 400 Bad Request
            // return { error: "missing _id" }
            assert.fail('DELETE request not implemented yet');
            done();
        });
    });
});
