var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//收藏夹图标
var logger = require('morgan');//记录日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');


var routes = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var settings=require('./settings');

var db=require('./db');

var app = express();

// view engine setup设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var fs=require('fs');
var ws=fs.createWriteStream('./access.log',{flags:'a'});


app.use(logger('dev'));//记录访问日志，dev一种日志格式
app.use(bodyParser.json());//处理JSON主体
app.use(bodyParser.urlencoded({ extended: false }));//处理表单序列化urlencoded请求体
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:settings.secret,
  resave:true,
  saveUninitialized:true,
  store:new MongoStore({
    url:settings.url
  })
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success=req.flash('success').toString();
  res.locals.error=req.flash('error').toString();
  next();
});

app.use('/', routes);
app.use('/user',user);
app.use('/article', article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404',{});
  //next(err);
});

// error handlers

// development error handler开发错误处理的时候
// will print stacktrace将会打印堆栈信息
var errorLog=fs.createWriteStream('./error.log');
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    errorLog.write(err.status+' '+err.stack);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler    生产环境 正式环境 错误处理
// no stacktraces leaked to user不向用户暴露错误信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
