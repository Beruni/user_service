"use strict";
var JsonRenderer = (function () {
    function JsonRenderer(response) {
        this.response = response;
    }
    JsonRenderer.prototype.render = function (object) {
        this.response.writeHead(200, { "Content-Type": "text/plain" });
        this.response.end(JSON.stringify(object));
    };
    JsonRenderer.prototype.renderError = function (error, statusCode) {
        this.response.writeHead(statusCode);
        if (process.env.NODE_ENV != 'production') {
            this.response.end(error.message);
        }
    };
    return JsonRenderer;
}());
exports.JsonRenderer = JsonRenderer;
//# sourceMappingURL=index.js.map