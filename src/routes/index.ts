import * as controllers from '../controllers';
import * as renderers from '../renderers';
import * as express from 'express';

var routes = express.Router();

routes.get('/users/:id', function(request, response) {
  var usersController = new controllers.UsersController(new renderers.JsonRenderer(response));
  usersController.get(request.params['id']);
});

export = routes;