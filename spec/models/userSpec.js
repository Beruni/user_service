var proxyquire = require('proxyquire');
var mongoModelStub = {where: null};
var User = proxyquire('../../models/user', {'mongoose': {Schema: function(){}, model: function(){return mongoModelStub}}}).User;

describe('User', function() {
  it('should have a key column as _id', function() {
    var user = new User();
    expect(user.key()).toEqual('_id');
  });
  it('should try to find the user by supplied id', function() {
    var whereAssertions = function(key, id) {
      expect(key).toEqual('_id');
      expect(id).toEqual('foobar');
    };
    spyOn(mongoModelStub, 'where').andCallFake(whereAssertions);
    var user = new User();
    user.findById('foobar');
    expect(mongoModelStub.where).toHaveBeenCalled();
  });
});