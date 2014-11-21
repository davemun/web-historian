var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelper = require('../web/http-helpers.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile("./archives/sites.txt", function(err, data){
     if(err)throw err;
     callback( JSON.parse( data.toString() ) );
  });
};

exports.isUrlInList = function(urlInQuestion, callback){
  exports.readListOfUrls(function(objectListUrls){
    console.log(objectListUrls[urlInQuestion] === urlInQuestion+'\n');
    callback( objectListUrls[urlInQuestion] === urlInQuestion+'\n' );
  });
};

exports.addUrlToList = function(url, req, res){
  exports.readListOfUrls(function(urlSiteList){
    urlSiteList[url] = url + '\n';
    var jsonVersion = JSON.stringify( urlSiteList );
    fs.writeFile("./archives/sites.txt", jsonVersion, function(){

      //302 code lets the browser know it's a redirect and to look for the key 'location'
      httpHelper.headers['location'] = 'archiving.html';
      console.log("res object BEFORE:"+JSON.stringify(res));
      res.writeHead(302, 'OK', httpHelper.headers );
      console.log("res objectAFTER:"+JSON.stringify(res));
      res.end();
    });
  });
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};


exports.sendArchive = function(pageToSend, req, res){

  exports.isUrlInList(pageToSend, function(bool){
    if(bool){
      console.log("pageToSend: "+pageToSend);
      httpHelper.sendFile({filePath:pageToSend, contType:'text/html'}, req, res);
    }else{

      //we dont have page and need to fetch it, and add to list and then send it
      exports.addUrlToList( pageToSend, req, res );

    }
  })


};







