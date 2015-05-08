'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('http server running', function() {
  it('should listen to GET requests at /hello', function() {
    chai.request('localhost:5000')
      .get('/hello')
      end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
      });
  });
});
