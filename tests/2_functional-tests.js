const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
suite('Functional Tests', () => {

    suite('/api/issues/:project', () => {
        suite('GET', () => {
            suite('Viewing issues for a specific project', () => {
                suite('responds with status 200 OK', () => {
                    test('returns an array of all issues with all fields', (done) => {
                        assert.fail('GET request not implemented yet');
                        done();
                    });
                    test('filters issues by any single query parameter', (done) => {
                        assert.fail('GET request not implemented yet');
                        done();
                    });
                    test('filters issues by multiple query parameters', (done) => {
                        assert.fail('GET request not implemented yet');
                        done();
                    });
                })
            });
        });

        suite('POST', () => {
            suite('Creating a new issue for a specific project', () => {
                suite('responds with status 201 Created', () => {
                    suite('returns the created issue object', () => {
                        test('has the required fields issue_title, issue_text, created_by and the optional fields assigned_to and status_text', (done) => {
                            assert.fail('POST request not implemented yet');
                            done();
                        });
                        test('has all submitted fields and optional fields as empty when not provided. It includes created_on (date/time), updated_on (date/time), open (boolean, true for open - default value, false for closed), and _id', (done) => {
                            assert.fail('POST request not implemented yet');
                            done();
                        });
                    });
                });
                suite('responds with status 400 Bad Request', () => {
                    test('returns { error: "required field(s) missing" } when required fields are missing ', (done) => {
                        assert.fail('POST request not implemented yet');
                        done();
                    });
                });
            });

            suite('PUT', () => {
                suite('Updating an existing issue by _id', () => {
                    suite('responds with status 200 OK', () => {
                        suite('returns {  result: "successfully updated", "_id": _id }', () => {
                            test('updates the updated_on field when one field is updated', (done) => {
                                assert.fail('PUT request not implemented yet');
                                done();
                            });
                            test('updates the updated_on field when many fields are updated', (done) => {
                                assert.fail('PUT request not implemented yet');
                                done();
                            });
                        });
                    });
                    suite('responds with status 400 Bad Request', () => {
                        test('returns  { error: "missing _id" } when _id is missing', (done) => {
                            assert.fail('PUT request not implemented yet');
                            done();
                        });
                        test('returns { error: "no update field(s) sent", "_id": _id } when no update fields are provided', (done) => {
                            assert.fail('PUT request not implemented yet');
                            done();
                        });
                        test('returns { error: "could not update", "_id": _id } when _id is invalid', (done) => {
                            assert.fail('PUT request not implemented yet');
                            done();
                        });
                    });
                });
            });

            suite('DELETE', () => {
                suite('Deleting an issue by _id', () => {
                    suite('responds with status 204 No Content', () => {
                        test('returns { result: "successfully deleted", "_id": _id } on successful deletion', (done) => {
                            assert.fail('DELETE request not implemented yet');
                            done();
                        });
                    });
                    suite('responds with status 400 Bad Request', () => {
                        test('returns { error: "could not delete", "_id": _id } when _id is invalid', (done) => {
                            assert.fail('DELETE request not implemented yet');
                            done();
                        });
                        test('returns { error: "missing _id" } when _id is missing', (done) => {
                            assert.fail('DELETE request not implemented yet');
                            done();
                        });
                    });
                });
            });

        });
    });


});
