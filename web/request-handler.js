var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!


exports.handleRequest = function (req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	if(req.method === 'GET'){
		if(req.url === '/'){
			fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, data){
				if(err){
					res.statusCode = 404;
					res.end()
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(data));
				}
			});
		} else{
			//res.end(JSON.stringify('/google/'))
			fs.readdir(archive.paths.archivedSites, function(err, stats){
				//console.log(archive.paths.archivedSites);
				console.log(stats)
				if(stats){
					console.log(true)
				}
	
				res.end()
			})
		}
	}
};
