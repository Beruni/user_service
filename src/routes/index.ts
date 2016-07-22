import * as controllers from '../controllers';
import * as models from '../models';

import * as renderers from '../renderers';
import * as express from 'express';

var routes = express.Router();

var loginUsingSession = function(request,response, next){
  var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
  if(request.session['token'])
    usersController.get(request.session['token']);
  next();
}

routes.use(loginUsingSession);

routes.get('/current_user', function(request, response) {
  var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
  console.log(request['session']['user_id'])
  usersController.get(request['session']['user_id']);
});

if(process.env.NODE_ENV != 'production') {
  // in development
  routes.post('/authorize',function(request, response) {
    var accessToken = request.body.accessToken;
	  var source = request.body.source;
	  var oauthUserId = request.body.userId;
    var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
    usersController.authorize(request, accessToken, source, oauthUserId);
  });
}

export = routes;