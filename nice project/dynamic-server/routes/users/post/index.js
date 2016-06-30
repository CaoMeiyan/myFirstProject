/**
 * Created by dell on 2016/6/30.
 */
var fs = require('fs');
module.exports = function(query,request,response){
    var result='';
    request.on('data',function (data) {
        result+=data;
    });
    request.on('end',function () {
        var user=querystring.parse(result);
        fs.readFile(DB_NAME,'utf8',function(err,data){
            try{
                var users = JSON.parse(data);//转成JSON对象
                if(users.length>0){
                    user.id = Number(users[users.length-1].id)+1;
                }else{
                    user.id = 1;
                }
            }catch(e){
                users = [];
                user.id = 1;
            }
            users.push(user);
            fs.writeFile(DB_NAME,JSON.stringify(users),function(err,result){
                response.writeHead(200, {
                    'Content-Type': 'application/json;charset=utf-8'
                });
                response.end(JSON.stringify({
                    code:'ok',
                    data:user
                }));
            })
        })
    });
}