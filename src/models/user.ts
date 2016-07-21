import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

var Schema = mongoose.Schema;
var userSchema = new Schema({
  "user_id" : String, 
  "source" : String,
  "email" : String,
  "name" : String
});

var model = mongoose.model('User', userSchema);

export class User {  
  key() {
    return "_id";
  }

  findById(id, callback) {
    var query = model.where(this.key(), id);
    query.findOne(callback);
  }

  userId(token: string) {
    return this.sessionHash(token)['user_id'];
  }

  sessionHash(token: string) {
    var decipher = crypto.createDecipher('aes-256-ctr', process.env.SESSION_ENC_PASSWORD || 'mysupersecureamazingpassword');
    var dec = decipher.update(token,'hex','utf8');
    dec += decipher.final('utf8');
    return JSON.parse(dec);    
  }

  userToken(userData: JSON) {
    var encryptedData = '';
    var cipher = crypto.createCipher('aes-256-ctr', process.env.SESSION_ENC_PASSWORD || 'mysupersecureamazingpassword');
    cipher.on('readable', function() {
      var data: Buffer = cipher.read() as Buffer;
      if (data) {
        encryptedData += data.toString('hex');
      }
    });
    
    var expiryDate = new Date(Date.now() + (30*60*1000));
    if(process.env.NODE_ENV != 'production') {
      console.log('New Session Generated, expiry : ' + expiryDate.toString());
    }
    cipher.write(JSON.stringify({"user_id": userData['_id'], "expiry_date": expiryDate.toString()}));
    cipher.end();
    return encryptedData;
  }

  save(userData:JSON, source:string){
    var user = new model({
      "user_id": userData["id"],
      "email":userData["email"], 
      "name":userData["name"], 
      "source": source
    });

    var query = model.where("user_id", userData["id"]);
    query.findOne(function(err,currentUser){
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