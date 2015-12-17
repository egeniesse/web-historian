var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.returnsArchive = function(url, callback){
  fs.readFile(exports.paths.archivedSites + "/" + url, function(err, content){
    if(err){
      callback(err);
    }else{
      callback(content);
    }
  });
};

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, "utf-8", function(err, content){
    if(err){
      callback(err);
    }else{
      callback(content.split("\n"));
    }
  }); 
};

exports.isUrlInList = function(url, callback) {
  // var callback = function(result){return result}
  fs.readFile(exports.paths.list, "utf-8", function(err, content){
    var contentArr = content.split('\n');
    if(err){
      callback(err);
    }else{
      if(_.indexOf(contentArr, url) > -1){
        callback(true);
      }else{
        callback(false);
      }
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.readFile(exports.paths.list, "utf-8", function(err, content){
    if(err){
      callback(err);
    }else{
      var newContent  = content.split("\n").concat(url).join('\n');
      fs.writeFile(exports.paths.list, newContent , "utf-8", function(err){
        if(err){
          callback(err);
        } else {
          callback();
        }
      });     
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  //fs.readDirectory returns an array of files in the dir
  fs.readdir(exports.paths.archivedSites, function(err, data){
    if(_.indexOf(data, url) > -1){
      callback(true);
    }else{
      callback(false);
    }
  });
};

exports.downloadUrls = function(urlArray) {
  //all of our dir sites
  if(urlArray.length){
    var url = urlArray[0];
    fs.writeFile(exports.paths.archivedSites + '/' + url, url,  "utf-8", function(err){
      if(err){
        return err;
      }else{
        exports.downloadUrls(urlArray.slice(1));
      }
    });
  }
};































