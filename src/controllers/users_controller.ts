import * as models from '../models';
var graph = require('fbgraph');

export class UsersController {
  renderer;
  user;
  constructor(renderer) {
    this.renderer = renderer;
    this.user = new models.User();
  }

  get(token) {
    var renderer = this.renderer;
    var userId = this.user.userId(token);
    this.user.findById(userId, function (err, user) {
      if (err) {
        console.log(err);
        renderer.renderError(err, 500);
      } else {
        renderer.render(user);
      }
    });
  }

  authorize(request, accessToken, source, oauthUserId) {
    graph.setAccessToken(accessToken);
    var user = this.user;
    var renderer = this.renderer;
    graph.get(oauthUserId, { "fields": "name, email" }, function(err, userData) {
      var userObject = user.save(userData,source);
      var userToken = user.userToken(userObject);
      request.session['user_token'] = userToken;;
      renderer.render({"user_token": userToken});
    });
  }
}