"use strict";
var controllers = require('../controllers');
var renderers = require('../renderers');
var express = require('express');
var routes = express.Router();
routes.get('/current_user', function (request, response) {
    var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
    usersController.get(request.cookies['user_token']);
});
if (process.env.NODE_ENV != 'production') {
    // in development
    routes.post('/authorize', function (request, response) {
        var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
        usersController.authorize(request.params['access_token'], request.params['source']);
    });
}
module.exports = routes;
//# sourceMappingURL=index.js.map