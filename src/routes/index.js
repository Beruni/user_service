"use strict";
var controllers = require('../controllers');
var renderers = require('../renderers');
var express = require('express');
var routes = express.Router();
routes.get('/users/:id', function (request, response) {
    var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
    usersController.get(request.params['id']);
});
module.exports = routes;
//# sourceMappingURL=index.js.map