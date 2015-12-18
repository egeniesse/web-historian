var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require("fs");

var getHompage = function(res, statusCode, page){

  fs.readFile(path.join(__dirname , "/public/" + page + ".html"), "utf-8", function(err, content){
    if(err){
      resEnd(res, null, 404);
    }else{
      homepage = content;
      resEnd(res, content, statusCode);
    }
  });
};

exports.handleRequest = function (req, res) {
  var statusCode = 200;
  var url = req.url
  if(req.method === "GET"){
    if(url === "/"){
      getHompage(res, 200, 'index')
    //if not root url  
    }else{
      archive.isUrlArchived(url.slice(1), function(bool){
        if(!bool){
          resEnd(res,null, 404);
        } else {
          archive.returnsArchive(url, function(content){
            resEnd(res, content, statusCode);
          });
        }
      });
    }
  }

  if(req.method === "POST"){
    var str = "";
    req.on("data", function(data){
      str += data;
    });
    req.on("end", function(){
      url = str.slice(4);
      archive.isUrlArchived(url, function(bool){
        if(bool){
          archive.returnsArchive(url, function(body){
            resEnd(res, body, 302);
          });
        } else {
          archive.scrapeWebsite(url, archive.downloadUrls);
          archive.addUrlToList(url, function(){
            getHompage(res, 302, 'waitingIndex');
          });
        }
      });
      // chedk if the url is on the list
        // navigate to the page
    });
  }
};



var resEnd = function(res, content, statusCode){
  res.setHeader("content-type", "text/html")
  res.statusCode = statusCode
  res.end(content)
}
