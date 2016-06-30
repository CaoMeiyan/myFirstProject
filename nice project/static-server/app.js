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
           response.statusCode=200;
           response.setHeader('Content-Type',mime.lookup(filename));
           fs.createReadStream(filename).pipe(response);
           //告诉浏览器要缓存文件
           response.setHeader('Cache-Control','Max-Age=20');
       } else {
           response.statusCode=404;
           response.end('Not Found');
       }
    });


   // response.end(pathname);


}).listen(9090);