import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

var userSchema = new mongoose.Schema({"_id" : String, "user_data": JSON,"source" : String});
var model = mongoose.model('User', userSchema);

export class User {  
  key() {
    return "_id";
  }

  findById(id, callback) {
    var query = model.where(this.key(), id);
    query.findOne(callback);
  }
  
  save(userData:JSON, source:string){
    var user = new model({"_id": userData["id"], "user_data": userData, "source": source});
    this.findById(userData['id'],function(err,currentUser){
      if(currentUser){
        console.log("User already exists");
      }else{
        user.save(function(err){
          console.log("saving");
          if(!err){
            console.log('User saved.');
          }
        });
      }
    });
    return user;
  }
}