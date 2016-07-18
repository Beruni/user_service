import * as controllers from '../controllers';
import * as renderers from '../renderers';
import * as express from 'express';

var routes = express.Router();

routes.get('/current_user', function(request, response) {
  var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
  usersController.get(request.cookies['user_token']);
});

if(process.env.NODE_ENV != 'production') {
  // in development
  routes.post('/authorize', function(request, response) {
    var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
    usersController.authorize(request.params['access_token'], request.params['source']);
  });
}

export = routes;