var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.assetList = {
  '/'              :{filePath:'web/public/index.html',  contentType:'text/html'},
  '/styles.css'    :{filePath:'web/public/styles.css',  contentType:'text/css'}
};


// exports.serveAssets = function(res, asset, callback) {
//   // Write some code here that helps serve up your static files!
//   // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
//   res.end(asset);
//   callback();
// };



// As you progress, keep thinking about what helper functions you can put here!
exports.sendFile = function (urlObj, req, res) {
  var filePath = urlObj.filePath;
  headers['Content-Type'] = urlObj.contentType;
  if(req.method === 'GET'){
    fs.readFile("./archives/sites/"+filePath, "utf8", function(err, data){
        if(err)throw err;
        console.log('Returning file...')
        res.writeHead(200, 'OK', headers);
        res.end(data);
    })
  }
  if(req.method === 'POST'){
    console.log("USING A POST METHOD");
  }
};

exports.sendAsset = function (url, req, res) {
  if(exports.assetList[url])
    var filePath = exports.assetList[url].filePath;
  fs.readFile(filePath, "utf8", function(err, data){
      if(err)throw err;
      console.log('Returning file...')
      res.writeHead(200, 'OK', headers);
      res.end(data);
  }); 
};




