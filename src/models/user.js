"use strict";
var mongoose = require('mongoose');
var model = mongoose.model('User', new mongoose.Schema({ user_id: Number, name: String }));
var User = (function () {
    function User() {
    }
    User.prototype.key = function () {
        return "_id";
    };
    User.prototype.findById = function (id, callback) {
        var query = model.where(this.key(), id);
        query.findOne(callback);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map