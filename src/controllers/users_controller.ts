import * as models from '../models';

export class UsersController {
  renderer;
  user;
  constructor(renderer) {
    this.renderer = renderer;
    this.user = new models.User();
  }

  get(token) {
    var renderer = this.renderer;
    var user = this.user;
    var userId = user.userId(token);
    user.findById(userId, function (err, user) {
      if (err) {
        console.log(err);
        renderer.renderError(err, 500);
      } else {
        renderer.render(user);
      }
    });
  }

  authorize(accessToken, source) {
    var sampleUserId = "5784c3544b40fad6bd2de42f";
    var userToken = this.user.userToken({"_id": sampleUserId});
    this.renderer.render({"user_token": userToken });
  }
}