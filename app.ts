///<reference path="typings/index.d.ts"/>

'use strict';

import * as express from "express";
import * as mongoose from "mongoose";
import * as cookieParser from 'cookie-parser'
import * as routes from "./src/routes";
import * as bodyParser from "body-parser";

var app = express();

app.set('port', process.env.PORT || '3001');
var mongo_fallback_host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
var mongo_fallback_url = 'mongodb://'+ mongo_fallback_host +'/beruni_users';

app.set('mongo_url', process.env.MONGODB_URI || mongo_fallback_url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token");
  res.header('Access-Control-Allow-Methods', "GET,POST");
  next();
});

app.get("/ping", function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.end("Pong");
});

app.use(routes);

app.listen(app.get('port'));
mongoose.connect(app.get('mongo_url'));