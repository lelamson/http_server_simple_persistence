'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('http server running', function() {
  it('should listen to GET request at /magic', function(done) {
    chai.request('localhost:5000')
      .get('/magic')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('should listen to POST request at /magic', function(done) {
    chai.request('localhost:5000')
      .post('/magic')
      .send({msg: 'Black'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(202);
        expect(res.body.msg).to.eql('Nice casting Black');
        done();
      });
  });
});
