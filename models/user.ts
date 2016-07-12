var mongoose = require('mongoose');
var model = mongoose.model('User', new mongoose.Schema({user_id: Number, name: String}));

export class User {
  key() {
    return "user_id";
  }

  findById(id) {
    return model.where(this.key(), id);
  }
}