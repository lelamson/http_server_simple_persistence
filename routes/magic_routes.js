'use strict';

var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/magic', function(req, res) {
    res.status(200).json({msg: 'Welcome to the dojo'});
  });

  router.post('/magic', function(req, res) {
    res.status(202).json({msg: 'Nice casting ' + req.body.msg});
  });

  router.get('*', function(req, res) {
    res.status(404).json({msg: 'This page is in a black hole'});
  });

}
