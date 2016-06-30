/**
 * Created by dell on 2016/6/29.
 */
var http=require('http');
var url=require('url');
var fs=require('fs');
var mime=require('mime');

http.createServer(function (requset, response) {
    var urlObj=url.parse(requset.url,true);
    var pathname=urlObj.pathname;
    var query=urlObj.query;

    var filename='.'+pathname;
    fs.exists(filename,function (exists) {
       if(exists){
          var isModified=requset.headers['if-modified-since'];
           if(isModified){
                fs.stat(filename,function (err,stat) {
                    if(isModified==stat.ctime.toUTCString()){
                        response.statusCode=304;
                        response.end('Not Modified');
                    }else {
                        sendFile();
                    }
                });

           }else {
               sendFile();
           }
       } else {
           response.statusCode=404;
           response.end('Not Found');
       }
    });

    function sendFile() {
        response.statusCode=200;
        response.setHeader('Content-Type',mime.lookup(filename));
        fs.stat(filename,function (err,stat) {
            response.setHeader('Cache-Control','Max-Age=20');
            response.setHeader('Last-Modified',stat.ctime.toUTCString());
            fs.createReadStream(filename).pipe(response);
        });

    }

   // response.end(pathname);


}).listen(9090,function () {
    console.log('index.html');
    console.log('index.js');
    console.log('index.css');
});