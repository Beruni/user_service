var specHelper = require('../spec_helper');
var stubUser = specHelper.stubMongoModel('user');

describe('User', function() {
  it('should have a key column as _id', function() {
    var user = new stubUser.model();
    expect(user.key()).toEqual('_id');
  });
  it('should try to find the user by supplied id', function() {
    var whereAssertions = function(key, id) {
      expect(key).toEqual('_id');
      expect(id).toEqual('foobar');
    };
    spyOn(stubUser.mongoModel, 'where').andCallFake(whereAssertions);
    var user = new stubUser.model();
    user.findById('foobar');
    expect(stubUser.mongoModel.where).toHaveBeenCalled();
  });
});