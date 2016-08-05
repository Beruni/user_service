import * as controllers from "../controllers";
import {JsonRenderer} from "../renderers";
import * as express from "express";
import {verify} from "jsonwebtoken";

var routes = express.Router();

var loginUsingSession = function(request, response, next) {
  var token = request.headers['authorization'];
  if(token) {
    verify(token,'Beruni', function(err, decoded) {
      if(err) {
        return new JsonRenderer(response).renderError({message: 'invalid token'}, 401);
      } else {
        request.decoded = decoded;
        next();
      }
    })
  } else {
    return new JsonRenderer(response).renderError({message: 'no token'}, 403);
  }
}

routes.use(/\/((?!authorize).)*/, loginUsingSession);

routes.get('/current_user', function(request, response) {
  var user = request['decoded'];
  return new JsonRenderer(response).render(user);
});

routes.post('/authorize',function(request, response) {
  var accessToken = request.body.accessToken;
  var source = request.body.source;
  var oauthUserId = request.body.userId;
  var usersController = new controllers.UsersController(new JsonRenderer(response), "Beruni");
  usersController.authorize(accessToken, source, oauthUserId);
});

export = routes;