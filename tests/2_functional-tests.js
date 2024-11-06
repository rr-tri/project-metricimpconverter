const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    describe('GET /api/convert', function () {

        it('should convert a valid input such as 10L', function (done) {
            chai.request(server)
                .get('/api/convert?input=10L')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'initNum');
                    assert.property(res.body, 'initUnit');
                    assert.property(res.body, 'returnNum');
                    assert.property(res.body, 'returnUnit');
                    assert.equal(res.body.initNum, 10);
                    assert.equal(res.body.initUnit, 'L');
                    done();
                });
        });

        it('should return an error for an invalid input such as 32g', function (done) {
            chai.request(server)
                .get('/api/convert?input=32g')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'invalid unit');
                    done();
                });
        });

        it('should return an error for an invalid number such as 3/7.2/4kg', function (done) {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'invalid number');
                    done();
                });
        });

        it('should return an error for an invalid number AND unit such as 3/7.2/4kilomegagram', function (done) {
            chai.request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'error');
                    assert.equal(res.body.error, 'invalid number and unit');
                    done();
                });
        });

        it('should convert with no number such as kg', function (done) {
            chai.request(server)
                .get('/api/convert?input=kg')
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isObject(res.body, 'Response should be an object');
                    assert.property(res.body, 'initNum');
                    assert.property(res.body, 'initUnit');
                    assert.property(res.body, 'returnNum');
                    assert.property(res.body, 'returnUnit');
                    assert.equal(res.body.initNum, 1); // Default to 1 if no number is provided
                    assert.equal(res.body.initUnit, 'kg');
                    done();
                });
        });

    });
});
