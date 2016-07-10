var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/reg', function(req, res, next) {
  res.render('user/reg',{title:'注册'});
});


//接受注册表单
router.post('/reg',function (req, res) {
  var user=req.body;
  if(user.password!=user.repassword){
    req.flash('error','密码和重置密码不一致');
    return res.redirect('back');
  }
  delete user.repassword;
  user.password=md5(user.password);
  user.avatar = 'https://secure.gravatar.com/avatar/'
      +md5(user.email)+'?s=48';
  Model('User').create(user,function (err, doc) {
    if(err){
      req.flash('error','注册用户失败');
      return res.redirect('back');
    }else {
      req.flash('success','恭喜用户注册成功');
      req.session.user=doc;
      res.redirect('/');
    }
  })



});
function md5(str) {
  return require('crypto').createHash('md5').update(str).digest('hex');
}



router.get('/login', function(req, res, next) {
  res.render('user/login',{title:'登录'});
});
router.post('/login',function (req,res) {
  var user=req.body;
  user.password=md5(user.password);
  Model('User').findOne(user,function (err,doc) {
    if(err){
      req.flash('error','登录失败');
      res.redirect('back');
    }else {
      if(doc){
        req.flash('success','登录成功');
        req.session.user=doc;
        res.direct('/');
      }else {
        req.flash('error','登录失败');//如果失败的话重定向上个登录页
        res.redirect('back');
      }
    }
  })
});


router.get('/logout', function(req, res, next) {
  req.session.user=null;
  res.redirect('/user/login');
});

module.exports = router;
