"use strict";
var models = require('./models');
var UsersController = (function () {
    function UsersController(renderer) {
        this.renderer = renderer;
    }
    UsersController.prototype.get = function (id) {
        var user = new models.User();
        var renderer = this.renderer;
        user.findById(id, function (err, user) {
            if (err)
                console.log(err);
            renderer.render(user);
        });
    };
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=users_controller.js.map