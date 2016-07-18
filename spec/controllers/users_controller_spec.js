var specHelper = require('../spec_helper');
var usersControllerHandle = specHelper.requireController('users_controller');

describe('UserController', function() {

    describe('get', function() {

        xit('should render user for given userId', function() {
            var renderer = {render: function(user) {
                expect(user).not.toBe(null);
            }};
            spyOn(renderer, 'render');

            var userController = new usersControllerHandle.controller(renderer);
            var userId = '5784c3544b40fad6bd2de42f';
            var userObject = {user: 'some user', _id: userId};

            usersControllerHandle.models.User.prototype.findById = function(id, callback) {
                expect(id).toEqual(userId);
                callback(null, userObject);
            };
            userController.get(userId);
            expect(renderer.render).toHaveBeenCalledWith(userObject);
        });

        xit('should log the error and continue to render the model in case fetch fails', function() {
            var renderer = {render: function(user){}};
            spyOn(renderer, 'render');
            spyOn(console, 'log').andCallFake(function(message) {
                expect(message).toEqual('some_error');
            });
            var userController = new usersControllerHandle.controller(renderer);
            usersControllerHandle.models.User.prototype.findById = function(id, callback) {
                callback('some_error', null);
            };
            userController.get('5784c3544b40fad6bd2de42f');
            expect(renderer.render).toHaveBeenCalledWith(null);
        });
    });
});