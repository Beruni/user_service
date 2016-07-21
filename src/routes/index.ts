import * as controllers from '../controllers';
import * as models from '../models';

import * as renderers from '../renderers';
import * as express from 'express';

var routes = express.Router();

routes.get('/current_user', function(request, response) {
  var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
  usersController.get(request.cookies['user_token']);
});

if(process.env.NODE_ENV != 'production') {
  // in development
  routes.post('/login', function(request, response) {
  	var accessToken = request.body.accessToken;
	var source = request.body.source;
	var oauthUserId = request.body.userId;
    var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
    usersController.authorize(accessToken, source, oauthUserId);
  });
}

export = routes;