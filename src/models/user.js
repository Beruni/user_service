"use strict";
var mongoose = require('mongoose');
var crypto = require('crypto');
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
    User.prototype.userId = function (token) {
        return this.sessionHash(token)['user_id'];
    };
    User.prototype.sessionHash = function (token) {
        var decipher = crypto.createDecipher('aes-256-ctr', process.env.SESSION_ENC_PASSWORD || 'mysupersecureamazingpassword');
        var dec = decipher.update(token, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return JSON.parse(dec);
    };
    User.prototype.userToken = function (userData) {
        var encryptedData = '';
        var cipher = crypto.createCipher('aes-256-ctr', process.env.SESSION_ENC_PASSWORD || 'mysupersecureamazingpassword');
        cipher.on('readable', function () {
            var data = cipher.read();
            if (data) {
                encryptedData += data.toString('hex');
            }
        });
        var expiryDate = new Date(Date.now() + 1800000);
        if (process.env.NODE_ENV != 'production') {
            console.log('New Session Generated, expiry : ' + expiryDate.toString());
        }
        cipher.write(JSON.stringify({ "user_id": userData['_id'], "expiry_date": expiryDate.toString() }));
        cipher.end();
        return encryptedData;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map