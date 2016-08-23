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
