var specHelper = require('../spec_helper');
var stubUserModel = specHelper.requireModel('user');

describe('User', function() {
  var user;
  beforeEach(function() {
    user = new stubUserModel.model();
  })
  describe('key', function () {
    it('should have a key column as _id', function () {
      expect(user.key()).toEqual('_id');
    });
  });
  describe('findById', function () {
    it('should try to find the user by supplied id and invoke callback', function () {
      var fakeWhere = function (key, id) {
        expect(key).toEqual('_id');
        expect(id).toEqual('foobar');
        return {
          findOne: function (callback) {
            callback(null, 'foobaruser');
          }
        }
      };
      
      spyOn(stubUserModel.mongoModel, 'where').andCallFake(fakeWhere);
      user.findById('foobar', function (err, user) {
        expect(err).toBeNull();
        expect(user).toEqual('foobaruser');
      });

      expect(stubUserModel.mongoModel.where).toHaveBeenCalled();
    });
  });

  describe('sessionHash', function() {
    it('should be able to parse the encrypted hash and give back relevant json', function() {
      var fakeHash = "f41f94a10e199167145bec36d269cfa2a8bb0b505aef27aae0fdaec2cf7d863408c730843e67a0e52278b772357c4a6933e91982f2566475caf1668a4a81178d9da13189f4e0828e7e1573f736167f88e7869bfa2b8193c1352a1d874801";
      var result = user.sessionHash(fakeHash)
      expect(result).toEqual({"user_id": "5784c3544b40fad6bd2de42f","expiry_date": "Mon Jul 18 2016 16:02:12 GMT+0530 (IST)"});
    });
  });
});