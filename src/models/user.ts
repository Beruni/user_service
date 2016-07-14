import * as mongoose from 'mongoose';
var model = mongoose.model('User', new mongoose.Schema({user_id: Number, name: String}));

export class User {
  key() {
    return "_id";
  }

  findById(id, callback) {
    var query = model.where(this.key(), id);
    query.findOne(callback);
  }
}