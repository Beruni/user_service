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
            userController.get("f41f94a10e199167145bec36d269cfa2a8bb0b505aef27aae0fdaec2cf7d863408c730843e67a0e52278b772357c4a6933e91982f2566475caf1668a4a81178d9da13189f4e0828e7e1573f736167f88e7869bfa2b8193c1352a1d874801");
            expect(renderer.render).toHaveBeenCalledWith(userObject);
        });

        xit('should log the error and continue to render the model in case fetch fails', function() {
            var renderer = {renderError: function(error, status){}};
            spyOn(renderer, 'renderError');
            spyOn(console, 'log').andCallFake(function(message) {
                expect(message).toEqual('some_error');
            });
            var userController = new usersControllerHandle.controller(renderer);
            usersControllerHandle.models.User.prototype.findById = function(id, callback) {
                callback('some_error', null);
            };
            userController.get("f41f94a10e199167145bec36d269cfa2a8bb0b505aef27aae0fdaec2cf7d863408c730843e67a0e52278b772357c4a6933e91982f2566475caf1668a4a81178d9da13189f4e0828e7e1573f736167f88e7869bfa2b8193c1352a1d874801");
            expect(renderer.renderError).toHaveBeenCalledWith('some_error', 500);
        });
    });
});