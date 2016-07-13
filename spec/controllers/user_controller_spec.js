var specHelper = require('../spec_helper');
var usersControllerHandle = specHelper.requireController('users_controller');

describe('UserController', function() {
    describe('get', function() {
        it('should render user for given userId', function() {
            var renderer = {render: function(user) {
                expect(user).toBeDefined();
                expect(user).not.toBe(null);
            }};
            spyOn(renderer, 'render');

            var userController = new usersControllerHandle.controller(renderer);
            var userId = 'test_id';
            var userObject = {user: 'some user', _id: userId};

            usersControllerHandle.models.User.prototype.findById = function(id, callback) {
                expect(id).toEqual(userId);
                callback(null, userObject);
            };
            userController.get(userId);
            expect(renderer.render).toHaveBeenCalledWith(userObject);
        });
    });
});