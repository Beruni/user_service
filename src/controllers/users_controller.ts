import * as models from '../models';

export class UsersController {
  renderer;
  constructor(renderer) {
    this.renderer = renderer;
  }

  get(id) {
    var user = new models.User();
    var renderer = this.renderer;

    user.findById(id, function (err, user) {
      if (err) console.log(err);
      renderer.render(user);
    });
  }
}