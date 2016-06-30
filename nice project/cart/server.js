/**
 * Created by dell on 2016/6/27.
 */
var http=require('http');
var fs=require('fs');
var url=require('url');
var mime=require('mime');

var server=http.createServer(function (request,response) {
    var urlObj=url.parse(request.url,true);
    var pathname=urlObj.pathname,query=urlObj.query;
    if(pathname=='/'){
        response.setHeader('content-type','text/html;charset=utf8');
        fs.createReadStream('./cart.html').pipe(response);
    }else if(pathname=='/computer'){
        var data=fs.createReadStream('./computer.json','utf8');
        response.end(data);
    }else {
        if(fs.existsSync('.'+pathname)){
            response.setHeader('content-type',mime.lookup(pathname)+';charset=utf8');
            fs.createReadStream('.'+pathname).pipe(response);
        }else {
            response.statusCode='404';
            response.end();
        }
    }

});
server.listen(8080,function () {
    console.log('8080端口已经启动');
});