"use strict";
var JsonRenderer = (function () {
    function JsonRenderer(response) {
        this.response = response;
    }
    JsonRenderer.prototype.render = function (object) {
        this.response.writeHead(200, { "Content-Type": "text/plain" });
        this.response.end(JSON.stringify(object));
    };
    return JsonRenderer;
}());
exports.JsonRenderer = JsonRenderer;
//# sourceMappingURL=index.js.map