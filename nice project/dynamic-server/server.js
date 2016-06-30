/**
 * Created by dell on 2016/6/29.
 */
var http=require('http');
var fs=require('fs');
var path=require('path');
var url=require('url');
var mime=require('mime');
var querystring=require('querystring');
global.DB_NAME = './users.json';

http.createServer(function (request, response) {
    var uriObj=url.parse(request.url,true);
    var pathname=uriObj.pathname;
    var query=uriObj.query;
    var method=request.method;
    pathname=pathname+(pathname.endsWith('/')?'index.html':'');
    request.setEncoding('utf8');//设置年编码类型
    console.log(request.url,method);
    try{
        require('./routes'+pathname+'/'+method.toLowerCase())(query,request,response);
    }catch(e){
        require('./routes/static')(pathname,response);
    }

}).listen(9090);