/**
 * Created by dell on 2016/6/29.
 */
/*
* 将任意长度的输入转换成固定长度的输出
* 1.不管输入多长，输出都是任意的
* 2不同的输入，输出不同
* 3不能从输出推算输入
* 作用：
* 1.加密密码
* 2.签名
*
* */
var crypto=require('crypto');
var hash=crypto.createHash('md5');//指定加密算法
var hashed=hash.update('hello');//加密的字符串
var result=hashed.digest('hex');//输出摘要值
console.log(result);