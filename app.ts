///<reference path="typings/index.d.ts"/>

'use strict';

import * as express from "express";
import * as mongoose from "mongoose";
import * as cookieParser from 'cookie-parser'
import * as routes from "./src/routes";

var bodyParser = require('body-parser');
var session = require('express-session');
var store = require('mongoose-session');

var app = express();

app.set('port', process.env.PORT || '3001');
app.set('mongo_host', process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost');

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    name: 'Beruni',
    secret: 'this session will be encrypted',
    store: store(mongoose),
    cookie:{
    	maxAge: 60 * 60 * 1000,
    	domain : 'http://localhost:8080',
    	path : '/'
    }
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get("/ping", function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.end("Pong");
});

app.use(routes);

app.listen(app.get('port'));
mongoose.connect('mongodb://'+ app.get('mongo_host') +'/beruni_users');