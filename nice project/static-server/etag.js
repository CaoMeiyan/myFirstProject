/**
 * Created by dell on 2016/6/29.
 */
var http=require('http');
var url=require('url');
var fs=require('fs');
var mime=require('mime');
var crypto=require('crypto');

http.createServer(function (requset, response) {
    var urlObj=url.parse(requset.url,true);
    var pathname=urlObj.pathname;
    pathname=pathname+(pathname.endsWith('/')?'index.html':'');

    var query=urlObj.query;

    var filename='.'+pathname;
    fs.exists(filename,function (exists) {
       if(exists){
          var ifNoneMatch=requset.headers['if-none-match'];
           if(ifNoneMatch){
               var rs=fs.createReadStream(filename);
               var md5=crypto.createHash('md5');
               rs.on('data',function (data) {
                   md5.update(data);
               });
               rs.on('end',function () {
                   var etag=md5.digest('hex');
                   if(ifNoneMatch==etag){
                       response.statusCode=304;
                       response.end();
                   }else {
                       sendFile(etag);
                   }
               });

           }else {
               var rs=fs.createReadStream(filename);
               var md5=crypto.createHash('md5');
               rs.on('data',function (data) {
                   md5.update(data);
               });
               rs.on('end',function () {
                   var etag=md5.digest('hex');
                   sendFile(etag);
               });
               
           }
       } else {
           response.statusCode=404;
           response.end('Not Found');
       }
    });

    function sendFile(etag) {
        response.statusCode=200;
        response.setHeader('Content-Type',mime.lookup(filename));
        fs.stat(filename,function (err,stat) {
            response.setHeader('Cache-Control','Max-Age=20');
            response.setHeader('Etag',etag);
            fs.createReadStream(filename).pipe(response);
        });

    }

   // response.end(pathname);


}).listen(9090,function () {
    console.log('index.html');
    console.log('index.js');
    console.log('index.css');
});