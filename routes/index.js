"use strict";
var controllers = require('./controllers');
var renderers = require('./renderers');
var express = require('express');
var router = express.Router();
router.get('/users/:id', function (request, response) {
    var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
    usersController.get(request.params['id']);
});
module.exports = router;
//# sourceMappingURL=index.js.map