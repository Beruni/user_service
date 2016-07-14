var proxyquire = require('proxyquire');
var inflection = require('inflection');

function requireModel(modelName) {
    var mongoModelStub = {where: null};
    var mongooseStub = {Schema: function(){}, model: function(){return mongoModelStub}};
    var model = proxyquire('../models/' + modelName, {'mongoose': mongooseStub})[inflection.camelize(modelName)];
    return {model: model, mongoModel: mongoModelStub};
}

function requireController(controllerName){
    var stubModels = {
      User: function(){},
      '@noCallThru': true
    };
    var controller = proxyquire('../controllers/' + controllerName, {'./models': stubModels})[inflection.camelize(controllerName)];
    return {controller: controller, models: stubModels};
}


exports.requireModel = requireModel;
exports.requireController = requireController;