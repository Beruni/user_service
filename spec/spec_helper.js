var proxyquire = require('proxyquire');

function stubMongoModel(modelName) {
  var mongoModelStub = {where: null};
  var mongooseStub = {Schema: function(){}, model: function(){return mongoModelStub}};
  var model = proxyquire('../models/' + modelName, {'mongoose': mongooseStub}).User;
  return {model: model, mongoModel: mongoModelStub};
}

exports.stubMongoModel = stubMongoModel;