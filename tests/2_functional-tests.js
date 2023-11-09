const chaiHttp = require('chai-http');
const chai = require('chai');
const { assert } = chai;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('/api/issues/:project', () => {
        test('GET returns all issues with all fields', (done) => {
            assert.fail('GET request not implemented yet');
            done();
        });

        test('GET filters issues by a single query parameter', (done) => {
            assert.fail('GET request not implemented yet');
            done();
        });

        test('GET filters issues by multiple query parameters', (done) => {
            assert.fail('GET request not implemented yet');
            done();
        });

        test('POST creates an issue with required fields', (done) => {
            assert.fail('POST request not implemented yet');
            done();
        });

        test('POST creates an issue with optional fields defaulted', (done) => {
            assert.fail('POST request not implemented yet');
            done();
        });

        test('POST returns an error when required fields are missing', (done) => {
            assert.fail('POST request not implemented yet');
            done();
        });

        test('PUT updates issue fields and updated_on timestamp when a single field is updated', (done) => {
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT updates issue fields and updated_on timestamp when multiple fields are updated', (done) => {
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT returns an error when _id is missing', (done) => {
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT returns an error when no update fields are provided', (done) => {
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('PUT returns an error when _id is invalid', (done) => {
            assert.fail('PUT request not implemented yet');
            done();
        });

        test('DELETE successfully deletes an issue with a valid _id', (done) => {
            assert.fail('DELETE request not implemented yet');
            done();
        });

        test('DELETE returns an error when _id is invalid', (done) => {
            assert.fail('DELETE request not implemented yet');
            done();
        });

        test('DELETE returns an error when _id is missing', (done) => {
            assert.fail('DELETE request not implemented yet');
            done();
        });
    });
});
