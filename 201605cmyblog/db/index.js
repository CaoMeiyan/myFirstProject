/**
 * Created by dell on 2016/7/10.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var settings=require('../settings');
var modles=require('./models');

mongoose.connect(settings.url);

mongoose.model('User',new Schema(modles.User));
mongoose.model('Article',new Schema(modles.Article));

global.Model=function (type) {
    return mongoose.model(type);
};
