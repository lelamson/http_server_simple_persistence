'use strict';

var fs = require('fs');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.get('/magic', function(req, res) {
    res.status(200).json({magic: 'Welcome to the dojo'});
  });

  router.post('/magic/:spell', function(req, res) {
    fs.writeFile('./dbjson/' + req.params.spell + '.json', JSON.stringify(req.body), function(err) {
      if (err) throw err;
    });
    res.status(201).json({magic: 'Nice casting ' + req.body.magic});
  });

  router.put('/magic/:spell', function(req, res) {
    fs.writeFile('./dbjson/' + req.params.spell + '.json', JSON.stringify(req.body), function(err) {
      if (err) throw err;
    });
    res.status(202).json({magic: 'Recasting ' + req.body.magic});
  });



  router.get('*', function(req, res) {
    res.status(404).json({magic: 'This page is in a black hole'});
  });

}
