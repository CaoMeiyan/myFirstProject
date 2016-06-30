/**
 * Created by dell on 2016/6/28.
 */
!function () {
    var tools={
        encodeToURIString:function (data) {
            if(typeof data==='string'){
                return data;
            }
            if(typeof data==='object'){
                var arr=[];
                for (var n in data){
                    if(!(data.hasOwnProperty(n)))
                        continue;
                    arr.push(encodeURIComponent(n)+'='+encodeURIComponent(data[n]));
                }
                return arr.join('&');
            }
            return '';
        },
        padString:function (url, data) {
            data=this.encodeToURIString(data);
            if(!data){
                return url;
            }
            return url+(/\?/.test(url)?'&':'?')+data;
        }
    };
    var counter=1;
    this.jsonp=function (url,data,jsonpcallback,callback) {
        var count='cd'+counter++;
        var callbackName='window.jsonp.'+count;
        url=tools.padString(url,data);
        url=tools.padString(url,jsonpcallback+'='+callbackName);
        
        window.jsonp[count]=function (data){
            try {
                callback(data);
            }finally {
                script.parentNode.removeChild(script);
                delete window.jsonp[count];
            }
        };
        var script=document.createElement('script');
        script.src=url;
        script.async='async';
        var timer=setInterval(function () {
            if(document.readyState==='complete'){
                document.body.appendChild(script);
                clearInterval(timer);
            }
            
        },300);
    }
}();