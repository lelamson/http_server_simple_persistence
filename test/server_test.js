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
      .post('/magic/missile')
      .send({magic: 'magic missile'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(201);
        expect(res.body.magic).to.eql('Nice casting magic missile');
        done();
      });
  });

  it('should listen for PUT request at /magic', function(done) {
    chai.request('localhost:5000')
      .put('/magic/missile')
      .send({magic: 'magic missile flare'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(202);
        expect(res.body.magic).to.eql('Recasting magic missile flare');
        done();
      });
  });

  describe('should listen to DELETE request', function(){
    it('no file to delete', function(done) {
      chai.request('localhost:5000')
        .del('/magic/nofile')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.eql(404);
          done();
        });
    });

    it('should delete file', function(done) {
      chai.request('localhost:5000')
        .del('/magic/missile')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });

  it('should be a 404 page', function(done) {
    chai.request('localhost:5000')
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(404);
        expect(res.body.magic).to.eql('This page is in a black hole');
        done();
      });
  });

});
