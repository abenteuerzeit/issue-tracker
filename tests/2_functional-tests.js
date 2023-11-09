const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
suite('Functional Tests', () => {

    suite('/api/issues/:project', () => {

        suite('GET', () => {

            suite('Reading and Issue', () => {

                suite('200 OK', () => {

                    test('returns all issues array with all fields', (done) => {
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

            suite('Creating an issue', () => {

                suite('201 Created', () => {

                    suite('Required fields provided (issue_title, issue_text, created_by)', () => {

                        test('Optional fields provided', (done) => {
                            assert.fail('POST request not implemented yet');
                            done();
                        });

                        test('Optional fields empty when not provided. (created_on (date/time), updated_on (date/time), open (boolean, true for open - default value, false for closed), and _id)', (done) => {
                            assert.fail('POST request not implemented yet');
                            done();
                        });
                    })
                });

                suite('400 Bad Request', () => {

                    test('returns { error: "required field(s) missing" } when required fields are missing ', (done) => {
                        assert.fail('POST request not implemented yet');
                        done();
                    });
                });
            });

            suite('PUT', () => {

                suite('Updating issue by _id', () => {

                    suite('200 OK', () => {

                        suite('returns {  result: "successfully updated", "_id": _id }', () => {

                            suite('Updates the updated_on field', () => {

                                test('when one field is updated', (done) => {
                                    assert.fail('PUT request not implemented yet');
                                    done();
                                });

                                test('when many fields are updated', (done) => {
                                    assert.fail('PUT request not implemented yet');
                                    done();
                                });
                            });
                        });
                    });

                    suite('400 Bad Request', () => {

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

                    suite('204 No Content', () => {

                        test('returns { result: "successfully deleted", "_id": _id } on successful deletion', (done) => {
                            assert.fail('DELETE request not implemented yet');
                            done();
                        });
                    });

                    suite('400 Bad Request', () => {

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
