var models = require('./models');

export class UsersController {
  renderer;
  constructor(renderer) {
    this.renderer = renderer;
  }
  get(id) {
    var user = new models.User();
    var tableQuery = user.findById(id);
    var renderer = this.renderer;
    tableQuery.findOne(function (err, user) {
      if (err) console.log(err);
      renderer.render(user);
    });
  }
}