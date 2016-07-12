var controllers = require('./controllers');
var renderers = require('./renderers');

import * as express from 'express';

var router = express.Router();

router.get('/users/:id', function(request, response) {
  var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
  usersController.get(request.params['id']);
});

export = router;