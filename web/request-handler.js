var path          = require('path');
var archive       = require('../helpers/archive-helpers');
var httpHelper    = require('../web/http-helpers.js');
var fs            = require('fs');

//http request for making requests to other servers,
// like ajax for your server
// require more modules/folders here!
//npm install request, cheerio

exports.handleRequest = function (req, res) {
  //creates url from GET request from submit
  //button
  //Todo: make less janky version ^_^



  //check if GET request is for asset or for archive
  //if its an asset just send the asset
    //sendAsset()
  //if its an sendArchive()
    //sendarchive checks if we have it and sends what we have if we do
    //if we dont then we create a new one and send that

  if(req.method === 'GET'){
    if( httpHelper.assetList[req.url] ){
      httpHelper.sendAsset( req.url, req, res );
    } else { 
      var pageToGet = req.url.slice(1);
      archive.sendArchive( pageToGet , req, res );
    }
  }

  if(req.method === 'POST'){
    archive.sendArchive(req._postData.url, req, res);
  }









  

  // if(routerForGet[req.url]){
  //   sendFile( routerForGet[req.url], req, res);
  // }
  // else{
  //   archive.isUrlInList(pageToGet, function(bool){
  //     if(!bool){
  //       archive.addUrlToList(pageToGet);
  //     }
  //   });
    
  // }

  //enter a url thru input tag
  //check url in our sites.txt list
        //serve up the html file in archives/sites/
    //otherwise scrape that page and save it to archives/sites/, and add url to list sites.txt

};

