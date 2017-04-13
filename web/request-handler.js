var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');

// require more modules/folders here!

var actions = {
  GET : function(req,res) {



    //helpers.sendData(res, __dirname+'/public/index.html', 200);

    //----------
    var reqURL = url.parse(req.url);
    var p = reqURL.pathname;
    console.log('pathname -------->', p);
    if(p === '/') {
      console.log('calling sendData');
      helpers.sendData(res, __dirname+'/public/index.html', 200);
    } 

    else {
      // console.log('URL ----->', p === '/');

      helpers.sendData(res, archive.paths.archivedSites+p+'/index.html', 200);
    }


  },
  POST : function(req,res) {


  }
}

exports.handleRequest = function (req, res) {

  if(actions[req.method]) actions[req.method] (req, res);


  //res.end(archive.paths.list);
};
