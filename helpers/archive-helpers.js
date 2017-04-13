var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if(err) {
      console.log('error' + error);
    } else {
      callback(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  
  exports.readListOfUrls(function(data){
    var a = (data.includes(url));
    callback(a);
    //return data;
  });
};

exports.addUrlToList = function(url, callback) {

  fs.appendFile(exports.paths.list, url, 'utf-8', function(err){
   if(err) {
    console.log(err);
   } else callback();
  });
};

exports.isUrlArchived = function(url, callback) {

  if (fs.existsSync(exports.paths.archivedSites + '/' + url)) callback(true); else callback(false);

};

exports.downloadUrls = function(urls) {
  urls.forEach(function(url) {
    exports.isUrlArchived(url, function(status) {
      if (!status) {
        fs.mkdir(exports.paths.archivedSites + '/' + url);
        var file = fs.createWriteStream(exports.paths.archivedSites + '/' + url + '/index.html');
        var request = http.get('http://'+url, function(response) {
          response.pipe(file);
          file.on('finish', function() {
            file.close();
          });
        });
      }
    });
    // console.log('DownloadUrls' + exists);
  });
};
