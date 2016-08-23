
//选项卡操作
    ~function () {
    var newsL=document.getElementById('newsL');
    var oul=newsL.getElementsByTagName('ul')[0];
    var oLis=oul.getElementsByTagName('li');
     var newsR=document.getElementById('newsR');
    var oDiv=document.querySelectorAll("#newsR>div");
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i]
            curLi.index=i;
            curLi.onclick= function () {
                tab(this.index);
            }
        }
        function tab(n){
            for(var i=0;i<oLis.length;i++){
                oLis[i].className='';
                oDiv[i].className='newsRdiv1';
            }
            oLis[n].className='on';
            oDiv[n].className='newsRdiv1 on';
        }
}()


   ~function () {
        var n=1,totalPage=null,data=[];
       getHtml();
       function getHtml() {
           function callback(jsonData) {
               var ary=[];
               for(var i=(n-1)*20;i<=(20*n-1);i++){
                   if(i>jsonData.length-1){
                       break;
                   }
                   ary.push(jsonData[i]);
               }
               var total=Math.ceil(jsonData.length/20);
               var data=ary;
               var res={
                   totalPage:total,
                   data:data
               }

/*----------------------------------------------Page1-------------------------------------*/
               var str='';

               for(var i=0;i<res.data.length;i++){
                   var data=res.data[i]
                   str+=`<ul>
                <li><span class='glyphicon glyphicon-arrow-right'></span> ${data.content}</li>
            </ul>`
               }
               str+=` <div class="pagebox">
                <div>首页</div>
                <div>上页</div>
                <div>下页</div>
                <div>尾页</div>
                <span>转到</span><input type="text" value="1">
                <div>第  <span>${n}</span> 页</div>
                <div>共<span>${res.totalPage}</span>页</div>
            </div>`
               document.getElementById('newsRdiv1').innerHTML=str;
   /*---------------------------------------Page2---------------------------------------------------------------------*/
              str='';
               for(var i=4;i<res.data.length;i++){
                   var data=res.data[i]
                   str+=`<ul>
                <li><span class='glyphicon glyphicon-arrow-right'></span> ${data.content}</li>
            </ul>`
               }
               str+=` <div class="pagebox">
                <div>首页</div>
                <div>上页</div>
                <div>下页</div>
                <div>尾页</div>
                <span>转到</span><input type="text" value="1">
                <div>第  <span>${n}</span> 页</div>
                <div>共<span>${res.totalPage}</span>页</div>
            </div>`
               document.getElementById('newsRdiv2').innerHTML=str;
    /*------------------------------------------Page3---------------------------------------------------------------------*/
               str='';
               for(var i=7;i<res.data.length;i++){
                   var data=res.data[i]
                   str+=`<ul>
                <li><span class='glyphicon glyphicon-arrow-right'></span> ${data.content}</li>
            </ul>`
               }
               str+=` <div class="pagebox">
                <div>首页</div>
                <div>上页</div>
                <div>下页</div>
                <div>尾页</div>
                <span>转到</span><input type="text" value="1">
                <div>第  <span>${n}</span> 页</div>
                <div>共<span>${res.totalPage}</span>页</div>
            </div>`
               document.getElementById('newsRdiv3').innerHTML=str;


           }
           var xhr=new XMLHttpRequest();
           xhr.open('get','../newsdata.json',true);
           xhr.onreadystatechange=function () {
               if(xhr.readyState==4&&xhr.status==200){
                   callback(JSON.parse(xhr.responseText));
               }
           }
           xhr.send();

       }
       totalPage=25;
    var pageBox=document.getElementById('pageBox');
    var newsR=document.getElementById('newsR');
console.log(pageBox);
       document.body.onclick= function (e) {
           var tar= e.target;
           console.log(tar);
           if(tar.tagName.toUpperCase()==="DIV"){
               if(tar.innerHTML=="首页"){
                   if(n===1){
                       return;
                   }
                   n=1
               }
               if(tar.innerHTML=="上页"){
                   if(n===1){
                       return
                   }
                   n--;
               }
               if(tar.innerHTML=="下页"){
                   if(n===totalPage){
                       return
                   }
                   n++;
               }
               if(tar.innerHTML=="尾页"){
                   if(n===totalPage){
                       return;
                   }
                   n=totalPage;
                   console.log(n)
               }
               getHtml();

           }


           /*pageInput.onkeyup= function (e) {
               var tempN=this.value.replace(/^ +| +$/g,"");
               if(e.keyCode===13){
                   if(isNaN(tempN)){
                       this.value=n;
                       return;
                   }
                   if(tempN==n){
                       return;
                   }
                   if(tempN<1){
                       n=1;
                   }else if(tempN>totalPage){
                       n=totalPage;
                   }
                   else{
                       n=tempN;
                       pageList.value=n;
                   }

                   bindHtml();
               }

           }*/



       }






   }()
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
