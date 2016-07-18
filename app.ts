///<reference path="typings/index.d.ts"/>

'use strict';

import * as express from "express";
import * as mongoose from "mongoose";
import * as cookieParser from 'cookie-parser'
import * as routes from "./src/routes";

var app = express();
app.set('port', process.env.PORT || '3001');
app.set('mongo_host', process.env.MONGO_HOST || 'localhost');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});
app.use(cookieParser());

app.get("/ping", function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.end("Pong");
});

app.use(routes);

app.listen(app.get('port'));
mongoose.connect('mongodb://'+ app.get('mongo_host') +'/beruni_users');