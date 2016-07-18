import * as express from 'express';

export class JsonRenderer {
  response:express.Response;
  constructor(response) {
    this.response = response;
  }

  render(object) {
    this.response.writeHead(200, { "Content-Type": "text/plain" });
    this.response.end(JSON.stringify(object));
  }

  renderError(error, statusCode) {
  	this.response.writeHead(statusCode);
  	if(process.env.NODE_ENV != 'production') {
  		this.response.end(error.message);
  	}
  }
}