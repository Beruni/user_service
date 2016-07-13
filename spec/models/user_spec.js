var specHelper = require('../spec_helper');
var stubUserModel = specHelper.requireModel('user');

describe('User', function() {
  describe('key', function(){
    it('should have a key column as _id', function() {
      var user = new stubUserModel.model();
      expect(user.key()).toEqual('_id');
    });
  });
  describe('findById', function() {
    it('should try to find the user by supplied id and invoke callback', function () {
      var fakeWhere = function (key, id) {
        expect(key).toEqual('_id');
        expect(id).toEqual('foobar');
        return {findOne: function(callback) {callback(null, 'foobaruser');}}
      };
      var user = new stubUserModel.model();
      spyOn(stubUserModel.mongoModel, 'where').andCallFake(fakeWhere);
      user.findById('foobar', function(err, user) {
        expect(err).toBeNull();
        expect(user).toEqual('foobaruser');
      });
      
      expect(stubUserModel.mongoModel.where).toHaveBeenCalled();
    });
  });
});