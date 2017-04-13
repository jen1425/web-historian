var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers.js');

// require more modules/folders here!

var actions = {
  GET : function(req,res) {

    var responseurl = url.parse(req.url).pathname.substring(1);

    if (!responseurl) {
      helpers.sendData(res, archive.paths.siteAssets + '/index.html', 200);
    } else {
      console.log('Calling load content');
      loadContent(responseurl, res);
    }

  },
  POST : function(req,res) {
    var str;
    req.on('data', function(chunk) {
      str = chunk.toString().slice(4);

    }).on('end', function() {
      archive.isUrlArchived(str, function(status) {
        console.log('STATUS -------- > ' + status);
        if (status) {
          console.log('site name ' + archive.paths.archivedSites + '/' + str + '/index.html');
          helpers.sendData(res, archive.paths.archivedSites + '/' + str + '/index.html', 302);
        } else {
          archive.addUrlToList(str + '\n', function() {
            helpers.sendData(res, archive.paths.siteAssets + '/loading.html', 404);            
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {

  if(actions[req.method]) actions[req.method] (req, res);

  //res.end(archive.paths.list);
};

var loadContent = function(responseurl, res) {
  archive.isUrlArchived(responseurl, function(status) {
    console.log('STATUS -------- > ' + status);
    if (status) {
      console.log('site name ' + archive.paths.archivedSites + '/' + responseurl + '/index.html');
      helpers.sendData(res, archive.paths.archivedSites + '/' + responseurl + '/index.html', 200);
    } else {
      helpers.sendData(res, archive.paths.siteAssets + '/loading.html', 404);
    }
  });
};
