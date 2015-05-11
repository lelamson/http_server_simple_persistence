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

  router.patch('/magic/:spell', function(req, res) {
    fs.readdir('./dbjson/', function(err, files) {
      files.forEach(function(item) {
        if(item === req.params.spell + '.json') {
          fs.readFile('./dbjson/' + req.params.spell + '.json', function (err, chunk) {
            var data = JSON.parse(chunk);
            for (var key in req.body) {
                if (data[key] != req.body[key]) {
                  data[key] = req.body[key];
                }
            }
            fs.writeFile('./dbjson/' + req.params.spell + '.json', JSON.stringify(data), function(err) {
              if (err) throw err;
              return res.status(200).send('Patch successful');
            });
          });
        } else {
          return res.status(404).send('What the 404');
        }
      });
    });
  });

  router.delete('/magic/:spell', function(req, res) {
    fs.readdir('./dbjson/', function(err, files) {
      files.forEach(function(item) {
        if(item === req.params.spell + '.json') {
          fs.unlink('./dbjson/' + req.params.spell + '.json', function() {
          });
          return res.status(200).send('Exterminated');
        }
        return res.status(404).send('What the 404');
      });
    });
  });

  router.get('*', function(req, res) {
    res.status(404).json({magic: 'This page is in a black hole'});
  });

}
