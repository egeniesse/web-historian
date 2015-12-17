var path = require('path');
var archive = require('../helpers/archive-helpers');

var url = require('url');
var fs = require("fs");
// require more modules/folders here!
var header = [
  "Content-Type", 'application/json'
]



exports.handleRequest = function (req, res) {

  var statusCode = 200;
  var url = req.url

  if(req.method === "GET"){

    if(url === "/"){
      fs.readFile(path.join(__dirname , "/public/index.html"), "utf-8", function(err, content){
        if(err){
          resEnd(res, null, 404);
        }else{
          resEnd(res, content, statusCode);
        }
      });
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
      console.log(str.slice(4), "str")

      archive.addUrlToList(str.slice(4), function(){
        resEnd(res, null, 302);
      });
    });
  }
};

var resEnd = function(res, content, statusCode){
  res.setHeader("content-type", "text/html")
  res.statusCode = statusCode
  res.end(content)
}
