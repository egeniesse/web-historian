var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require("fs");
// require more modules/folders here!
var header = [
  'Content-Type', 'application/json'
]


exports.handleRequest = function (req, res) {
  res.setHeader("content-type", 'application/json' );
  res.statusCode = 200;
  var url = req.url
  // archive.isUrlInList("google.com"), function(result){
  //   console.log(result)
  // }
  if(req.method === "GET"){

    if(url === "/"){
      var indexContent = fs.readFile(path.join(__dirname , "/public/index.html"), "utf-8", function(err, content){
        if(err){
          res.statusCode = 404;
        }else{
          res.end(JSON.stringify(content));
        }
      });
    }
  }
  // res.end(archive.paths.list);
};
