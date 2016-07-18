import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

var model = mongoose.model('User', new mongoose.Schema({user_id: Number, name: String}));

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
    
    var expiryDate = new Date(Date.now() + 1800000);
    if(process.env.NODE_ENV != 'production') {
      console.log('New Session Generated, expiry : ' + expiryDate.toString());
    }
    cipher.write(JSON.stringify({"user_id": userData['_id'], "expiry_date": expiryDate.toString()}));
    cipher.end();
    return encryptedData;
  }
}