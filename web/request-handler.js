var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

// require more modules/folders here!

var actions = {
  GET : function(req,res) {

    var requestURL = url.parse(req.url, true);
    var pathName = requestURL.pathname;
    console.log('path -------->',pathName);
    if(pathName === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf-8', function(err, data) {
        if(err) {
          console.log('error '+err);
        } else {
          res.writeHead(200, {'Content-type':'text/html'});
          res.end(data);
        }

      });
    }

  },
  POST : function(req,res) {
    

  }
}

exports.handleRequest = function (req, res) {

  if(actions[req.method]) actions[req.method] (req, res);


  res.end(archive.paths.list);
};
