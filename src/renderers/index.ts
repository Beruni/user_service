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
}