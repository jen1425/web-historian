var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(response, asset, callback) {
  console.log('serveAssets was called');

  fs.readFile(asset, 'utf-8', function(err, data) {
    if(err) throw err; 
     callback(data);

  });

};

exports.sendData = function(response, asset, statusCode) {

  response.writeHead(statusCode, exports.headers);
  exports.serveAssets(response, asset, function(htmlData) {
    response.end(htmlData);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
