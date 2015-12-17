var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require("fs");
// require more modules/folders here!
var header = [
  "Content-Type", 'application/json'
]


exports.handleRequest = function (req, res) {
  // var header = "content-type", 'application/json';
  var statusCode = 200;
  var url = req.url
  // archive.isUrlInList("google.com", function(bool){
  //   console.log(bool)
  // });
  if(req.method === "GET"){

    if(url === "/"){
      fs.readFile(path.join(__dirname , "/public/index.html"), "utf-8", function(err, content){
        if(err){
          resEnd(res, null, header, 404);
        }else{
          resEnd(res, content, header, statusCode);
        }
      });
    }else{
      archive.isUrlInList(url , function(result){
        if(result){
          fs.readFile(exports.paths.archivedSites + url, "utf-8", function(err, content){
            if(err){
              callback(err);
            }else{
              callback(content)
            }
          })
        }else{
          archive.addUrlToList(url);
          //archive it
        }  
      })
    }
  }
  // res.end(archive.paths.list);
};

var resEnd = function(res, content, header, statusCode){
  res.setHeader("content-type", "application/json")
  res.statusCode = statusCode
  res.end(JSON.stringify(content))
}
