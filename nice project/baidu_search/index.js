/**
 * Created by dell on 2016/6/28.
 */
var search=document.getElementById('search');
var searchBtn=document.getElementById('searchBtn');
var searchList=document.getElementById('search-list');
var box=document.getElementById('box');

document.body.onclick=function () {
    searchList.parentNode.style.display='none';
};

searchList.onclick=function (e) {
    e=e||window.event;
    var target=e.srcElement||e.target;
    window.open('https://www.baidu.com/s?wd='+encodeURIComponent(target.innerHTML),'_blank');
};

searchBtn.onclick=function (e) {
  var val=search.value;
    if(val){
       jsonp('http://suggestion.baidu.com/su',{wd:val},'cb',function (data) {
           var list=data.s;
           var fragement=document.createDocumentFragment();
           for(var i=0;i<list.length;i++){
               var li=document.createElement('li');
               li.innerHTML=list[i];
               fragement.appendChild(li)
           }
           searchList.innerHTML='';
           searchList.parentNode.style.display='block';
           searchList.appendChild(fragement);
           
       }) ;
    }
};
box.onclick=function (e) {
    e.stopPropagation();
    e.cancelBubble=true;
};