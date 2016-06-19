/**
 * Created by Administrator on 2016/6/11.
 */
!function () {
    var oName=document.getElementsByName("name").item(0);
    oName.onfocus=function(){
        if(this.value==this.defaultValue)
            this.value="";
    }

    oName.onblur=function(){
        var reg=/^\s*$/;
        if(reg.test(this.value)){
            this.value=this.defaultValue;//	
        }
        //在把表单数据提交之前，应该把所有空格（或首尾空格）去掉
        var regSpace=/\s+/g;//去掉所有空格的正则
        this.value=this.value.replace(regSpace,"");

        //var regTrim=/^(\s+|\s+)$/;
        //var regTrim=/^\s+|\s+$/g;


        var reg=/^[\u4e00-\u9fa5]{2,4}$/;
        if(reg.test(this.value)){
            //输入正确
            var oTip=document.getElementById("tip");
            if(!oTip){//如果这个提示条不存在则创建
                var oTip=document.createElement("span");
                oTip.id="tip"
                this.parentNode.insertBefore(oTip,this.nextSibling);
            }
            //
            oTip.style.color="green";
            oTip.innerHTML="输入正确";


        }else{
            //请输入合法姓名
            var oTip=document.getElementById("tip");
            if(!oTip){
                oTip=document.createElement("span");
                oTip.id="tip"
                this.parentNode.insertBefore(oTip,this.nextSibling);
            }

            oTip.style.color="red";
            oTip.innerHTML="请输入合法姓名";
        }
    }
}();
