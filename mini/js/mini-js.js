/*购物框显示*/
~function () {
    var cartMenu = document.getElementById("cartMenu");
    var miniCart = document.getElementById("miniCart");
    var header = document.getElementById("header");
    var cartBtn = document.getElementById("cartBtn");
    cartMenu.onmouseover = function (e) {
        e = e || window.event;

        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }
    header.onmouseover = function (e) {
        e = e || window.event;

        var tar = e.target || e.srcElement;
        if (tar.id === "cartBtn"||tar.parentNode.id === "cartBtn") {
            $(cartMenu).stop().slideDown(200);
            cartMenu.style.display = "block";
            cartBtn.style.background = "#FFFFFF";
            cartBtn.style.color = "#ff6700";
            return
        }
        cartMenu.style.display = "none";
        cartBtn.style.background = "#424242";
        cartBtn.style.color = "#b0b0b0";
    }
}();
/*搜索框的显示与隐藏*/
~function () {
    var search = document.getElementById("search");
    var searchBtn = DOM.getByClass("search-btn", document)[0];
    var J_keywordList = document.getElementById("J_keywordList");
    var searchHotWords = DOM.getByClass("search-hot-words", document)[0];
    search.onfocus = function () {
        this.style.borderColor = "#ff6700";
        searchBtn.style.borderColor = "#ff6700";
        J_keywordList.style.display = "block";
        searchHotWords.style.display = "none";
    }
    search.onblur = function () {
        this.style.borderColor = "#e0e0e0";
        searchBtn.style.borderColor = "#e0e0e0";
        J_keywordList.style.display = "none";
        searchHotWords.style.display = "block";
    }

}();
/*小米明星单品部分轮播*/
(function () {
    var oStarWrapper = document.getElementById("star-wrapper");
    var leftBtn = document.getElementById("mLeftBtn");
    var rightBtn = document.getElementById("mRightBtn");
    var oMore = document.getElementById("more-i");

    function autoMove() {//自动左右切换
        oStarWrapper.timer1 = window.setInterval(function () {
            animate(oStarWrapper, {left: -1240}, 1000);
            oStarWrapper.timer2 = window.setTimeout(function () {
                animate(oStarWrapper, {left: 0}, 1000);
            }, 0)
        }, 3000);

    };
    autoMove();
    oMore.onmouseover = function () {
        window.clearTimeout(oStarWrapper.timer1);
    }
    oMore.onmouseleave = function () {
        autoMove();
    }

    leftBtn.onclick = function () {
        animate(oStarWrapper, {left: -1240}, 1000);
    }
    rightBtn.onclick = function () {
        animate(oStarWrapper, {left: 0}, 1000);
    }

})();
/*浮动效果*/
// ~function () {
//     var upEles=DOM.getByClass("brick-item-m",document);
//     for (var i=0;i<upEles.length;i++){
//         var curEle=upEles[i];
//         curEle.onmouseover=function () {
//             DOM.addClass(this,"active");
//         }
//         curEle.onmouseleave=function () {
//            DOM.removeClass(this,"active");
//         }
//
//     }
//
// }();
/*动态绑定配件部分的数据*/
~function () {
    var JAccList=document.getElementById("J_accessories_list");
    var JAcc=document.getElementById("J_accessories");
    var jsonData = null;
    var xhr = new XMLHttpRequest;
    xhr.open("get", "./JSON/accessoriesData.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonData = "JSON" in window ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")");
            jsonData = jsonData[0]
            bindData(jsonData);
            bindOnmouseover();
            tabChange(JAccList,JAcc);
        }
    };
    xhr.send(null);

    var oJrow = document.getElementById("J_accessories");

    function bindData(jsonData) {
        var str = '';
        $.each(jsonData, function (index, item) {
            if (index == "access1") {
                str += '<div class="span16 on"><div class="tab-container"><ul class="tab-content clearfix">';
            } else {
                str += '<div class="span16"><div class="tab-container"><ul class="tab-content clearfix" id="J_match_list1">';
            }
            $.each(item, function (index, curLi) {
                var reg = /^code(\d)$/;
                var num = reg.exec(index)[1];
                if (num < 8) {
                    str += '<li class="brick-item-m"><div class="figure-img"><a href="javascript:;"><img src="' + curLi["img"] + '"></a></div>';
                    str += '<h3 class="title">' + curLi["title"] + '</h3>';
                    str += '<p class="price"><span class="num">' + curLi["price"] + '</span>元</p>';
                    str += '<p class="rank">' + curLi["rank"] + '万人评价</p>';
                    str += '' +
                        '<div class="reviver-wrapper">' +
                        '<a href="javascript:;">' +
                        '<span class="reviver">'
                        + curLi["reiver"] + '' +
                        '</span>' +
                        '<span class="autor">'
                        + curLi["autor"] + '</span>' +
                        '</a>' +
                        '</div>';
                    str += '</li>';
                }
                else if (num == 8) {
                    str += '<li class="brick-item-m brick-item-s"><div class=" figure"><a href="javascript:;"><img src="' + curLi["img"] + '"></a></div>';
                    str += '<h3 class="title-s">功夫米兔手机支架</h3><p class="price-s"><span class="num">29</span>元</p></li>';
                }
                else {
                    str += '<li class="  brick-item-m brick-item-s brick-item-l"><div class="figure figure-more"><a href="javascript:;"><i class="iconfont">&#xe62e</i> </a></div><a href="javascript:;" class="more">浏览更多<small>' + curLi["small"] + '</small></a></li>';
                }
            });
            str += '</ul></div></div>';
        });

        oJrow.innerHTML += str;
    }


}();
/*动态绑定周边部分的数据*/
~function () {
    var JAroundList=document.getElementById("J_around_list");
    var JAround=document.getElementById("J_around");
    var jsonData = null;
    var xhr = new XMLHttpRequest;
    xhr.open("get", "./JSON/aroundData.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonData = "JSON" in window ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")");
            jsonData = jsonData[0]
            bindData(jsonData);
            bindOnmouseover();
           tabChange(JAroundList,JAround);
        }
    };
    xhr.send(null);

    var oJrow = document.getElementById("J_around");

    function bindData(jsonData) {
        var str = '';
        $.each(jsonData, function (index, item) {
            if (index == "around1") {
                str += '<div class="span16 on"><div class="tab-container"><ul class="tab-content clearfix">';
            } else {
                str += '<div class="span16"><div class="tab-container"><ul class="tab-content clearfix" id="J_match_list1">';
            }
            $.each(item, function (index, curLi) {
                var reg = /^code(\d)$/;
                var num = reg.exec(index)[1];
                if (num < 8) {
                    str += '<li class="brick-item-m"><div class="figure-img"><a href="javascript:;"><img src="' + curLi["img"] + '"></a></div>';
                    str += '<h3 class="title">' + curLi["title"] + '</h3>';
                    str += '<p class="price"><span class="num">' + curLi["price"] + '</span>元</p>';
                    str += '<p class="rank">' + curLi["rank"] + '万人评价</p>';
                    str += '' +
                        '<div class="reviver-wrapper">' +
                        '<a href="javascript:;">' +
                        '<span class="reviver">'
                        + curLi["reiver"] + '' +
                        '</span>' +
                        '<span class="autor">'
                        + curLi["autor"] + '</span>' +
                        '</a>' +
                        '</div>';
                    str += '</li>';
                }
                else if (num == 8) {
                    str += '<li class="brick-item-m brick-item-s"><div class=" figure"><a href="javascript:;"><img src="' + curLi["img"] + '"></a></div>';
                    str += '<h3 class="title-s">功夫米兔手机支架</h3><p class="price-s"><span class="num">29</span>元</p></li>';
                }
                else {
                    str += '<li class="  brick-item-m brick-item-s brick-item-l"><div class="figure figure-more"><a href="javascript:;"><i class="iconfont">&#xe62e</i> </a></div><a href="javascript:;" class="more">浏览更多<small>' + curLi["small"] + '</small></a></li>';
                }
            });
            str += '</ul></div></div>';
        });

        oJrow.innerHTML += str;
    }
}();
/*为你推介部分切换*/
!function () {
    var xmCarousel = document.getElementById("xm-carousel");
    var leftBtn = document.getElementById("recLeftBtn");
    var rightBtn = document.getElementById("recRightBtn");
    leftBtn.onclick = function () {
        animate(xmCarousel, {left: -1240}, 1000);
    }
    rightBtn.onclick = function () {
        animate(xmCarousel, {left: 0}, 1000);
    }

}();
/*内容里的左右按键切换以及焦点对齐*/
!function () {
    var oWrapper = DOM.getByClass("J_item-list", document);
    var leftBtn = DOM.getByClass("J_control-pre", document);
    var rightBtn = DOM.getByClass("J_control-next", document);
    var oUl = DOM.getByClass("xm-pagers", document);

    for (var i = 0; i < oWrapper.length; i++) {
        var curEle = oWrapper[i];
        wheelPlay(curEle, leftBtn[i], rightBtn[i], oUl[i]);
    }
    function wheelPlay(ele, leftBtn, rightBtn, oUl) {
        var oLis = DOM.children(oUl, "li");
        var step = 0;

        function changeTip() {
            for (var i = 0; i < oLis.length; i++) {
                var cur = oLis[i];
                if (i === step) {
                    DOM.addClass(cur, "pager-active")
                } else {
                    DOM.removeClass(cur, "pager-active");
                }
            }


        }

        rightBtn.onclick = function () {
            if (step >= 3) {
                ele.style.marginLeft = -888 + "px";
                return;
            }
            step++;
            animate(ele, {marginLeft: -step * 296}, 1000);
            changeTip();
        }
        leftBtn.onclick = function () {
            if (step <= 0) {
                ele.style.marginLeft = 0;
                return;
            }
            step--;
            animate(ele, {marginLeft: -step * 296}, 1000);
            changeTip();
        }
        ~function () {
            for (var i = 0; i < oLis.length; i++) {
                var cur = oLis[i];
                cur.index = i;
                cur.onclick = function () {
                    step = this.index;
                    changeTip();
                    animate(ele, {marginLeft: -step * 296}, 1000);
                }
            }

        }();

    }


}();
/*导航栏的选项卡*/
(function () {
    var navList = document.getElementById("nav-list");
    var list = DOM.getByClass("nav_item", navList);
    var childDivs = DOM.getByClass("item-children", navList);

    function computerWidth(index) {
        var ary = [];
        for (var i = 0; i < list.length; i++) {
            list[i].oWidth = list[i].offsetWidth;
            ary.push(list[i].oWidth);
        }
        return eval('(' + ary.slice(0, index).join("+") + ')');
    }

    var curIndex = null, flag = false;
    navList.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.parentNode.tagName.toUpperCase() == "LI" && tar.parentNode.className == "nav_item") {
            var index = DOM.index(tar.parentNode);
            curIndex = index;
            if (!flag) {
                $(childDivs[curIndex]).stop().slideDown(200);
            }
            if (flag) {
                for (var i = 0; i < childDivs.length; i++) {
                    childDivs[i].style.display = i == index ? "block" : "none";
                }
            }
        }
    };
    navList.onmouseenter = function () {

        $(childDivs[curIndex]).stop().slideDown(200);
        setTimeout(function () {
            flag = true;
        }, 1000)

    };
    navList.onmouseleave = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        $(childDivs[curIndex]).stop().slideUp(200);
    }

})();
/*渐隐渐现轮播图*/
~function () {

    var wheelOuter = document.getElementById("wheelOuter"),
        wheelInner = document.getElementById("wheelInner"),
        indexPoint = document.getElementById("indexPoint");
    var divs = wheelInner.getElementsByTagName("div");
    var lis = indexPoint.getElementsByTagName("li");
    var leftBtn = document.getElementById("leftBtn");
    var rightBtn = document.getElementById("rightBtn");
    var step = 0;
    var imgList=wheelInner.getElementsByTagName("img");
    //console.log(imgList);
    /*var jsonData=null;
    !function () {
        var xhr=new XMLHttpRequest;
        xhr.open("get","./JSON/navImg.json",true);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                var val=xhr.responseText;
                jsonData=DOM.formatJSON(val);
            }
        };
        xhr.send(null);
    }();*/
    function lazyImg(curImg) {
        if(curImg.isLoad){
            return
        }
        var oImg=new Image;
        oImg.src=curImg.getAttribute("trueImg");
        oImg.onload=function () {
            curImg.style.display="block";
            curImg.src=this.src;
            oImg=null;
        }
    }
    function handleAllImg() {
        for (var i=0;i<imgList.length;i++){
            lazyImg(imgList[i]);
        }
    }
    window.setTimeout(handleAllImg,1000);
    

    window.setTimeout(function () {
        animate(divs[0], {opacity: 1}, 600);
        divs[0].style.zIndex = 1;
    }, 1200);
    var timer = window.setInterval(autoMove, 2000);

    function autoMove() {
        step++;
        if (step > 4) {
            step = 0;
        }
        change();
        select()
    }

    function change() {
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.zIndex = 0;
        }
        divs[step].style.zIndex = 1;
        animate(divs[step], {opacity: 1}, 800, function () {
            for (var i = 0; i < divs.length; i++) {

                i !== step ? setCss(divs[i], "opacity", 0) : null;
            }
        })

    }

    function select() {
        for (var i = 0; i < lis.length; i++) {
            i !== step ? lis[i].className = "" : lis[i].className = "selected";
        }
    }

    function setCss(curEle, attr, val) {

        if (attr === "opacity") {
            curEle.style["opacity"] = val;
            curEle.style["filter"] = "alpha(opacity=" + val * 100 + ")";
        }
        var reg = /^width|height|left|top|(margin|pading(Top|Left|Right|Bottom)?)$/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val = val + "px";
            }
        }
        curEle.style[attr] = val;
    }

    wheelOuter.onmouseover = function () {
        clearInterval(timer);
        leftBtn.style.display = "block";
        rightBtn.style.display = "block";
    }
    wheelOuter.onmouseout = function () {
        leftBtn.style.display = "none";
        rightBtn.style.display = "none";
        timer = window.setInterval(autoMove, 2000);
    }
    leftBtn.onclick = function () {
        step--;
        if (step < 0) {
            step = 4;
        }
        change();
        select()
    }
    rightBtn.onclick = autoMove;
    for (var i = 0; i < lis.length; i++) {
        var curLi = lis[i];
        curLi.index = i;
        curLi.onclick = function () {
            step = this.index;
            change();
            select();
        }
    }
}();
/*左侧导航栏的隐藏与出现*/
~function () {
    var categoryList = document.getElementById("categoryList");
    var oLis = DOM.getByClass("category-item", categoryList);
    var oDivs = DOM.getByClass("children", categoryList);     //
    var oAlink = DOM.getByClass("a_link", categoryList);
    //console.log(oAlink);
    /* for (var i=0;i<oAlink.length;i++){
     var curA=oAlink[i];
     var curLi=oLis[i];
     curA.index=i;
     curLi.index=i;
     curA.onmouseover=function () {
     for (var j=0;j<oDivs.length;j++){
     oDivs[j].style.display="none";
     }
     oDivs[this.index].style.display="block";
     };
     curLi.onmouseleave=function (e) {
     if(e.target.className=="category-item"){
     oDivs[this.index].style.display="none";
     }
     }
     }*/

    document.body.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.parentNode.tagName.toUpperCase() == "LI" && tar.parentNode.className == "category-item") {
            var oIndex = DOM.index(tar.parentNode);
            for (var i = 0; i < oDivs.length; i++) {
                i == oIndex ? DOM.addClass(oDivs[i], "choice") : DOM.removeClass(oDivs[i], "choice");
            }
        }
    };
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].index = i;
        oLis[i].onmouseleave = function () {
            DOM.removeClass(oDivs[this.index], "choice");
        }
    }


}();
/*评价出现*/
function bindOnmouseover() {
    var $brickItem = $(".tab-content>li:not(.brick-item-s)");
    $brickItem.on('mouseover', function () {
        $(this).children(".reviver-wrapper").stop().animate({bottom: 0, opacity: 1}, 200);
    });
    $brickItem.on('mouseout', function () {
        $(this).children(".reviver-wrapper").stop().animate({bottom: -67, opacity: 0}, 200);
    })
}
/*match部分选项卡实现*/
!function () {
    var JMatchList = document.getElementById("J_match_list");
    var JMatch=document.getElementById("J_match");
    tabChange(JMatchList,JMatch);
}();

/*选项卡的方法*/
function tabChange(curUl,curDiv) {
    var oLis = curUl.getElementsByTagName("li");
    var oDivs = DOM.getByClass("span16", curDiv);
    for (var i = 0; i < oLis.length; i++) {
        var curLi = oLis[i];
        curLi.index = i;
        curLi.onmouseover = function () {
            for (var j = 0; j < oDivs.length; j++) {
                oDivs[j].className = "span16";
            }
            oDivs[this.index].className = "span16  on";
        }
    }
}
/*回到顶部*/
~function () {
    var linkTo=document.getElementById("linkTo");
    var clientH=document.documentElement.clientHeight||document.body.clientHeight;
    function windowScroll() {
        var curTop=DOM.win("scrollTop");
        linkTo.style.display=curTop>=clientH?"block":"none";
    }
    window.onscroll=windowScroll;
    linkTo.onclick=function () {
                this.style.display="none";
                window.onscroll=null;
                var target=DOM.win("scrollTop"),duration=500,interval=10,step=(target/duration)*interval;
                var timer=window.setInterval(function () {          var nowTop=DOM.win("scrollTop");
                    if(nowTop<=0){
                        window.clearInterval(timer);
                        window.onscroll=windowScroll;
                        return;
                    }
                    DOM.win("scrollTop",nowTop-step);

                },interval);
            }



}();
    


