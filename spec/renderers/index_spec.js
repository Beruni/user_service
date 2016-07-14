// var specHelper = require('../spec_helper');
// var rendererHandle = specHelper.requireRenderer('index');

var renderers = require('../../renderers');

describe('JsonRenderer',function(){

   it('should be able to render given object',function(){
       var stub_response = {writeHead: null, end: null};

       spyOn(stub_response, 'writeHead');
       spyOn(stub_response, 'end');
       var renderer = new renderers.JsonRenderer(stub_response);

       renderer.render({'test':'abcd'});

       expect(stub_response.writeHead).toHaveBeenCalledWith(200, { "Content-Type": "text/plain" });
       expect(stub_response.end).toHaveBeenCalledWith('{"test":"abcd"}');
   });
});