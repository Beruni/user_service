import { User } from '../models';
import { JsonRenderer } from '../renderers';
import {sign} from "jsonwebtoken";
var graph = require('fbgraph');

export class UsersController {

  private user: User;
  
  constructor(private renderer: JsonRenderer, private tokenSecret: string) {
    this.user = new User();
  }

  authorize(accessToken, source, oauthUserId) {
    graph.setAccessToken(accessToken);
    let user = this.user;
    let renderer = this.renderer;
    let tokenSecret = this.tokenSecret;
    graph.get(oauthUserId, { "fields": "name, email" }, function(err, userData) {
      user.save(userData, source);
      var userToken = sign(userData, tokenSecret, { expiresIn: 1440});
      renderer.render(userToken);
    });
  }
}