'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var port = 5000;

var magicRoutes = express.Router();

require('./routes/magic_routes')(magicRoutes);

app.use(magicRoutes);

app.listen(process.env.PORT || port, function() {
  console.log('Server running on port: ' + (process.env.PORT || port));
});
