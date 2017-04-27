function fkLogTime(keyName) {
    var This = (typeof Fai != "undefined" && Fai.top) || window;

    if (!This._fkTestMode) {
        return;
    }
    var time = new Date().getTime();
    typeof console != "undefined" && console.log && console.log(keyName + " : " + ((time - This._startTime) / 1000) + "秒");
}
var _cid = 12329909;
(function (FUN, undefined) {
    var list = [];
    FUN.run = function () {
        if (arguments.length < 1) {
            throw new Error("jzUtils.run 参数错误");
            return
        }
        var name = arguments[0].name, callMethod = arguments[0].callMethod || false, prompt = arguments[0].prompt || false, promptMsg = arguments[0].promptMsg || "功能还在加载中，请稍候", base = arguments[0].base || (window.Fai && Fai.top.Site) || top.Site || window, args = Array.prototype.slice.call(arguments), funcArgs = args.slice(1), callbackFunc = {}, result;
        result = checkMethod(name, base);
        if (result.success) {
            callMethod = false;
            try {
                result.func.apply(result.func, funcArgs)
            } catch (e) {
                console && console.log && console.log("错误:name=" + e.name + "; message=" + e.message)
            }
        } else {
            if (prompt) {
                window.Fai && Fai.ing(promptMsg, true)
            }
        }
        if (callMethod) {
            callbackFunc.name = name;
            callbackFunc.base = base;
            callbackFunc.args = funcArgs;
            list.push(callbackFunc)
        }
    };
    FUN.trigger = function (option) {
        if (typeof option !== "object") {
            throw new Error("jzUtils.trigger 参数错误");
            return
        }
        var funcName = option.name || "", base = option.base || (window.Fai && Fai.top.Site) || top.Site || window, newList = [], result, func, i, param;
        if (funcName.length < 1) {
            return
        }
        for (i = 0; i < list.length; i++) {
            param = list[i];
            if (param.name == funcName) {
                result = checkMethod(funcName, base);
                if (result.success) {
                    try {
                        result.func.apply(result.func, param.args)
                    } catch (e) {
                        console && console.log && console.log("错误:name=" + e.name + "; message=" + e.message)
                    }
                }
            } else {
                newList.push(param)
            }
        }
        list = newList
    };
    function checkMethod(funcName, base) {
        var methodList = funcName.split("."), readyFunc = base, result = {
            "success": true, "func": function () {
            }
        }, methodName, i;
        for (i = 0; i < methodList.length; i++) {
            methodName = methodList[i];
            if (methodName in readyFunc) {
                readyFunc = readyFunc[methodName]
            } else {
                result.success = false;
                return result
            }
        }
        result.func = readyFunc;
        return result
    }
})(window.jzUtils || (window.jzUtils = {}))


//js model_1
function showYuanDanWindow(){
    var hasShowYuanDanLuckyGuy = $.cookie("hasShowYuanDanLuckyGuy",{path:"/"});
    var _hasGetYuanDanLuckyGuy_ = $.cookie("_hasGetYuanDanLuckyGuy_",{path:"/"});
    var _openbigImg = false;

    if(_openbigImg == true){
        if(hasShowYuanDanLuckyGuy == 'true' || _hasGetYuanDanLuckyGuy_ != 'true' ){
            Site.isShowThreeDaysLuckyGuy = "true";
            Site.isTenMinutes = 'true';
            $.cookie("hasShowYuanDanLuckyGuy",false,{path:"/"});
            Site.drawLottery();
        }else{

            Site.sendResult2();
        }
    }
}



var fk_sale = new Object();
fk_sale.cid = 12329909;
fk_sale.siteVer = 10;
fk_sale.popupWindowSiteVer = 10;
fk_sale.isLuckyGuyFlag = false;
fk_sale.popupWindowEndYear = 2016;
fk_sale.popupWindowEndMonth = 12;
fk_sale.popupWindowEndDay = 31;
fk_sale.popupWindowDays = -9;
fk_sale.popupWindowMs = -807966287;
fk_sale.openDays = 21;
fk_sale.openMinutes = 31591;
fk_sale.popupWindowEndSignupHours = 720.0;
fk_sale.url = 'http://www.faisco.cn/portal.jsp#appId=shop';
fk_sale.showDomainWindowFlag = false;
fk_sale.cacct = 'mq11837910';
fk_sale.imgBigSrc = 'http://jz.faisys.com/image/pro/20161201/salesPromotion.png?v=201612132101';
fk_sale.imgBigBtn = 'http://jz.faisys.com/image/pro/20161201/btn_buy.png?v=201612132101';
fk_sale.imgClose = 'http://jz.faisys.com/image/pro/20161201/close.png?v=201612132101';
fk_sale.siteFirstLogin = false;
fk_sale.isShowAdvertisementWindowThreeMinute = false;
fk_sale.textUrl = 'http://www.faisco.cn/portal.jsp#appId=shop';
fk_sale.domainImgBigBg = 'http://jz.faisys.com/image/pro/20160101/domainSearchImg.png';
fk_sale.domainImgClose = 'http://jz.faisys.com/image/pro/20160101/close.png?v=201601181937';
fk_sale.siteBizBigClose = 'http://jz.faisys.com/image/pro/20160701/close_popup.png';
fk_sale.siteBizBigBg = 'http://jz.faisys.com/image/pro/20160701/popup02.png';
fk_sale.showSiteBizWindow = false;
fk_sale.showSitePopWindow = false;
fk_sale.openFlyer = false;
/**
 * Created by Administrator on 2016/12/26 0026.
 */
//////////////////////////////////////////////////////////////////////////////////////
var fk_showUpgrade = new Object();
fk_showUpgrade.siteVer = 10;
fk_showUpgrade.siteVerFree = true;
fk_showUpgrade.upgradeBgFree = 'http://jz.faisys.com/image/pro/20161101/fkVerUpBgFree.png?v=201611241558';
fk_showUpgrade.upgradeBgVer = 'http://jz.faisys.com/image/pro/20161101/fkVerUpBgVer.png?v=201611241558';
fk_showUpgrade.upgradeBgClose = 'http://jz.faisys.com/image/pro/20161101/closePop.png?v=201611241558';
//////////////////////////////////////////////////////////////////////////////////////
// 为了避免用户误操作，在域名结尾输入多余字符导致cookie失效问题，这里校验一下浏览器的host是否与后台拿到的host一致
//if (window.location.host != 'www.mq11837910.icoc.me') { window.location.href = 'http://' + 'www.mq11837910.icoc.me'; }
//console.log(window.location.host.lastIndexOf("."));

var _faiAjax = function(){
    //for regexp
    var r = /\?/;
    var _o = {
        type:"get",
        url:"",
        data:"",
        error:function(){},
        success:function(){}
    };
    var _sendRequest=function(o) {
        var xmlhttp = null;
        //init option code
        o.type = o.type || _o.type;
        o.url = o.url || _o.url;
        o.data = o.data || _o.data;
        o.error = o.error || _o.error;
        o.success = o.success || _o.success;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }else{
            // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        //the instructions param takes the form of an eval statement
        if(o.type != "post") {
            o.url += ( this.r.test( o.url ) ? "&" : "?" ) + o.data;
            xmlhttp.open("GET", o.url, true);
            xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    o.success( xmlhttp.responseText );
                }else if( o.error ){
                    o.error();
                }
            }
            xmlhttp.send();
        } else {
            xmlhttp.open("POST", o.url, true);
            //Send the proper header information along with the request
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            xmlhttp.onreadystatechange=function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    o.success( xmlhttp.responseText );
                }else{
                    o.error();
                }
            }
       //     xmlhttp.send(o.data);
        }
    }
    return {
        ajax:function(option){
            try {
                //此次调用的错误不让抛出给window。防止函数重入
                _sendRequest(option);
            }catch(e){
                //alert(e);
            }
        }
    };
}();
var _jsErrCahche = [];
window.onerror = function(sMsg,sUrl,sLine){
    if (typeof Site == 'undefined') {
        alert('您的网页未加载完成，请尝试按“CTRL+功能键F5”重新加载。');
    }
    if( sLine < 1 || typeof sMsg != 'string' || sMsg.length < 1 ){
        return;
    }

    var log = "Error:" + sMsg + ";Line:" + sLine + ";Url:" + sUrl;
    var alertLog = "Error:"+sMsg+"\n" + "Line:" + sLine + "\n" + "Url:" + sUrl + "\n";
    var encodeUrl = function (url){
        return typeof url === "undefined" ? "" : encodeURIComponent(url);
    };

    var ajax = true;
    var obj = { 'm' : sMsg, 'u' : sUrl, 'l' : sLine };
    for( var i = 0; i < _jsErrCahche.length; i ++ ){
        if( _jsErrCahche[i].m == obj.m && _jsErrCahche[i].u == obj.u && _jsErrCahche[i].l == obj.l  ){
            ajax = false;
            break;
        }
    }

    if( ajax ){
        _jsErrCahche.push( obj );
        _faiAjax.ajax({
            type	: "post",
            url		: "ajax/logJsErr_h.jsp?cmd=jsErr",
            data	: 'msg='+ encodeUrl(log)
        });
    }
    if(false){
        alert( alertLog );
    }
};
Fai.top = window;
var bgmCloseToOpen = false;
var _debug = false;
var _devMode = false;
var _colOtherStyleData = {"independentList":[],"y":0,"h":0,"layout4Width":0,"layout5Width":0};						// 当前页面的数据
var _templateOtherStyleData = {"independentList":[],"h":682,"y":0,"layout4Width":0,"layout5Width":0};						// 全局的数据

function showMemberBarArea(member)
{
    $("#memberBarArea").show();
    $("#memberBarArea").html("");
    $("#memberBarArea").append(" <div id='arrow' class='g_arrow g_arrow_up'></div> " +
        "<div id='memberBar' class='memberBar'>" +
        " <div class='m_left'> " +
        "<a class='memberHeadPicOuter' href='mCenter.html'>" +
        "<img id='topBarMemberPic' class='msgBoard_member_headpic' src='../image/member.png' style='height:30px'>" +
        "</a> " +
        "<a href='mCenter.html'><span class='userLabel' title='进入个人空间' id='memberName'>" + member.name + "</span></a> " +
        "<a href='javascript:onLogout();' class='exit'>[退出]</a> </div> <div class='right'> " +
        "</div> <div id='topBarMsg' style='display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:#eee; text-align:center; z-index: 9010;'></div> </div>");

    $(".J_memberLoginPanel").hide();
    $(".J_memberLoginPanel").html("");
    $("#memberLoginPanel").append("<div class='memberWelcome'> " +   "<a class='memberHeadPicOuter' href='mCenter.html'>" +
        "<img id='topBarMemberPic' class='msgBoard_member_headpic' src='../image/member.png' style='height:30px'>" +
        "</a> " +"<a href='mCenter.html'><span class='userLabel' title='进入个人空间' id='memberName'>" + member.name + "</span></a>,欢迎登录。</div>")

}

$(function() {

    $('#webFooterTable').load('footer.html');

    $.ajax({
        url: "/matchPlatform/getSession_getMemberInfo.action",
        type: "GET",
        // data : para,
        dataType: "text",
        success: function (result) {
            var member = jQuery.parseJSON(result);
            if (member != null) {
                showMemberBarArea(member);
            }
            else {
               if($("#memberBarArea").hasClass('loginAuthorizationPage'))
               {
                   window.location.href = "index.html";
               }
                $("#memberBarArea").hide();
                $(".J_memberLoginPanel").show();
                $(".memberWelcome").remove();


            }

        }
    });


    fkLogTime("jQ ready start");


    //Site.changeTheLogoSize();
  //  Site.showOrHideMailBox();



    var hasLoginSite = $.cookie('hasLoginSite');
    if(hasLoginSite == "true" && hasLoginSite != null){
        $.cookie('hasLoginSite','false', { expires: 1, path: '/' } );
        Site.changeAdmHref('mq11837910','faisco.cn');
    }
    if(false){
        Fai.ing("",true);
    }
    //topBarMember


    // 管理态下, QQ/微博登陆 禁止登陆
    //if( _manageMode ) {
    // $('#memberBar .l_Btn').click(function(){
    // 	Fai.ing('您目前处于网站管理状态，请先点击网站右上方的“退出”后再登录会员。', true);
    // });
    //绑定放大镜遮罩效果事件
    //Site.bindEventToOverLayer();
    //}


    // 绑定退出事件
    $(window).bind("beforeunload", function(e) {

        if(bgmCloseToOpen){
            Site.bgmFlushContinue();
        }






    });
    Site.initTemplateLayout(1, true, false );
    // spider统计






    // ajax统计
    //Site.total({colId:2, pdId:-1, ndId:-1, sc:0, rf:""});
    if(!_manageMode){
        Site.siteStatVisitTime();
    }
    //前端性能数据上报
    //Site.report();
    //保留旧用户的初始化版式区域4 和区域5 中，区域4的padding-right空间
    Site.colLayout45Width();
    //各个模块inc吐出脚本
    Site.onNavCntPositionFixTop(true);
    Site.initCorpTitleContent("primaryTitle", "", "pointer-events:none;");
    Site.hoverChangeImage();Site.hoverStyle();
    Site.initWeatherOfIP(434, 3);

   // Site.initBanner({"_open":true,"data":[{"title":"","desc":"","imgWidth":1100,"imgHeight":308,"ot":0,"href":"http://www.baidu.com","target":"_blank","src":"../img/banner/banner1.jpg","edgeLeft":"","edgeRight":""},{"title":"","desc":"","imgWidth":1084,"imgHeight":310,"ot":1,"src":"../img/banner/banner2.jpg","edgeLeft":"","edgeRight":""}],"width":1100,"height":310,"playTime":4000,"animateTime":1500,"from":"banner","btnType":2,"wideScreen":false}, {"_open":false}, 4);
    $('#pagenation624').find('a').hover(function(){$(this).addClass('g_hover')}, function(){$(this).removeClass('g_hover')});
    Site.loadNewsList(624, {"y":0,"s":0,"w":1}, false);
    Site.loadNewsNewStyle(624, false,false,false,true,false,false,false,false,false);
    Site.initMixNews({moduleId:624, leader:'0'});

    Site.loadNewsList(625, {"y":0,"s":0,"w":1}, true);
    Site.loadNewsNewStyle(625, false,false,false,true,false,false,false,false,false);

    Site.loadNewsList(629, {"y":0,"s":0,"w":1}, false);
    Site.loadNewsNewStyle(629, false,false,false,true,false,false,false,false,false);
    Site.initMixNews({moduleId:629, leader:'0'});

    Site.initMulColModuleInIE('#module404');
    Site.loadPhotoList(651, 2, true, 6,'listPhotos');
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 651, "imgEffOption": {"effType":6,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"style":88,"fullMaskCusBg":false,"fullMaskCusDisc":false,"halfMaskCusBg":false,"halfMaskCusDisc":false,"fullMaskOpenDisc":false}, "tagetOption": {"nameHidden":false,"nameWordWrap":false,"targetParent":"photoForm","target":"imgDiv","picScale":2}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    Site.initModuleMemberLogin(653, 2, true, false,{"skipUrl":"index.jsp","isPhotoGroup":false});

    Site.initContentSplitLine(657, {"y":0,"s":0,"w":1});
    Site.initMulColModuleInIE('#module440');

    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 659, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAg2puHwwUo3rO41wEw8gI4ugI.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});

    Site.loadNewsList(649, {"y":2,"s":2,"c":"#dbdbdb","w":1}, true);
    Site.loadNewsNewStyle(649, false,false,true,true,false,false,false,false,false);

    Site.initMulColModuleInIE('#module650');
    /*Fai.top.Photo603 = {};
    Fai.top.Photo603.ieOpt = {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"style":90,"fullMaskCusBg":false,"fullMaskCusDisc":false,"halfMaskCusBg":false,"halfMaskCusDisc":false,"fullMaskOpenDisc":false};
    Fai.top.Photo603.tgOpt = {"nameHidden":false,"nameWordWrap":false,"targetParent":"photoMarqueeForm","target":"imgDiv","picScale":2};
    Fai.top.Photo603.callbackArgs = [];
    Site.loadPhotoMarquee(603, 2, true, 0, 'listPhotos');
    Fai.top.photoSlideTmp603 = {};
    Fai.top.photoSlideTmp603 = {"photoSlideId":"photoSlide_603","photoSlideType":0,"photoDataList":[{"id":0,"name":"","basic":"","pic":"ABUIABAEGAAgyaPdwgUon8jDhAYwmgU4vAM","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAgyaPdwgUon8jDhAYwmgU4vAM.png","picWidth":666,"picHeight":444},{"id":1,"name":"","basic":"","pic":"ABUIABAEGAAggKTdwgUo4-ruDTCaBTi8Aw","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAggKTdwgUo4-ruDTCaBTi8Aw.png","picWidth":666,"picHeight":444},{"id":2,"name":"","basic":"","pic":"ABUIABAEGAAgiaTdwgUowubMODCaBTi8Aw","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAgiaTdwgUowubMODCaBTi8Aw.png","picWidth":666,"picHeight":444},{"id":3,"name":"","basic":"","pic":"ABUIABACGAAgnKTdwgUozOHr1gQwtAE4dw","picPath":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAgnKTdwgUozOHr1gQwtAE4dw.jpg","picWidth":180,"picHeight":119},{"id":4,"name":"","basic":"","pic":"ABUIABACGAAgpKTdwgUoiOimugYwtAE4hwE","picPath":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAgpKTdwgUoiOimugYwtAE4hwE.jpg","picWidth":180,"picHeight":135}],"pluginsOptions":{"closeBtn":{"on":true,"arg":{}},"prevBtn":{"on":true,"arg":{}},"nextBtn":{"on":true,"arg":{}},"descPanel":{"on":true,"arg":{}}}};
    Fai.top.changeMarquee603 = function(){Fai.stopInterval('marquee603');Site.loadPhotoMarquee(603, 2, true, 0, 'listPhotos');};
    Fai.top.listPhotos603 = {id:603,style:90, data:{"cusPicSize":true,"picScale":2,"newMarqueeToward":0}}*/

    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 612, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAg_8uCwwUoosnekQUw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 615, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAgs8yCwwUolsPTzwMw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 616, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAg0syCwwUo9MDHqgMw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 617, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAg6syCwwUoiJ2TkAQw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    Site.initMulColModuleInIE('#module606');
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 619, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAg4s2CwwUovMPbBDDQATg3.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 620, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAg782CwwUo946cygMw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 621, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAgg86CwwUo8tqC2QQw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    jzUtils.run({ "name": "ImageEffect.FUNC.BASIC.Init", "callMethod": true }, {"moduleId": 622, "imgEffOption": {"effType":1,"borderType":false,"borderColor":"#000","borderWidth":1,"borderStyle":1,"hoverPicPath":"http://0.ss.faisys.com/image/floatImgHoverDef.png","openHoverPic":false,"isFontIcon":false,"ishovFont":false,"hovFont":"faisco-icons-contact2","hovFontColor":"#222222","picPath":"http://12329909.s21i-12.faiusr.com/4/ABUIABAEGAAgks6CwwUo9Jn8xgQw0AE4Nw.png","isInit":false}, "tagetOption": {"targetParent":"floatImg_J","target":"floatImg_J"}, "callback": Site.createImageEffectContent_photo, "callbackArgs": []});
    Site.initMulColModuleInIE('#module618');




    Site.initPage();	// 这个要放在最后，因为模块组初始化时会把一些模块隐藏，导致没有高度，所以要放最后执行




    setTimeout(afterModuleLoaded, 0);

    if( _manageMode ) {

        Site.initManagePage();

    }



    Site.loadCss("../css/bannerAnimation.min.css");


    Site.triggerGobalEvent("siteReadyLoad");

    fkLogTime("jQ ready end");
});

function afterModuleLoaded() {
    fkLogTime("afterModuleLoaded start");

    Site.initPage2();


    if(_manageMode){
        Site.cacheModuleFunc.runManageInit();
        Site.cacheModuleFunc.runSiteInit();
    }
    //Site.mallCartInit(_colId);
    //Site.mobiWebInit();

    Site.optimizeFooterAlign();




    fkLogTime("afterModuleLoaded end");
} // afterModuleLoaded end

var _lcid = 2052;
var _userHostName = 'www.mq11837910.icoc.me';
var _siteDomain = 'http://www.mq11837910.icoc.me';
var _openDays = 21;
var _openHours = 526;
var _resRoot = '../';
var _colId = 2;
var _extId = 0;
var _fromColId = -1;
var _designAuth = false;
var _manageMode = false;
var _oem = false;
var _siteAuth = 0;
var _adm = false;
var _siteVer = 10;
var _manageStatus = false;
var _webRightBar = false;

var    baseUrl="/ufinder/files/dasaipingtai/banner/";

var nav2SubMenu=[];
var nav102SubMenu=[{"hidden":false,"colId":101,"href":"nr.html?type=0&page=1","target":" target='_self'","colName":"赛事新闻","html":"<span class='itemName0'>赛事新闻<\/span>","title":""},
                      {"hidden":false,"colId":102,"href":"nr.html?type=2&page=1","target":" target='_self'","colName":"赛事通知","html":"<span class='itemName0'>赛事通知<\/span>","title":""},
                      {"hidden":false,"colId":103,"href":"nr.html?type=1&page=1","target":" target='_self'","colName":"往届赛事","html":"<span class='itemName0'>往届赛事<\/span>","title":""}];
var nav112SubMenu= [{"hidden":false,"colId":201,"href":"nr.html?type=4","target":" target='_self'","colName":"培训指南","html":"<span class='itemName0'>培训指南<\/span>","title":""},
                       {"hidden":false,"colId":202,"href":"http://emlab.jxufe.edu.cn/presentation/sim.jsp","target":" target='_blank'","colName":"培训平台","html":"<span class='itemName0'>培训平台<\/span>","title":""},
                       {"hidden":false,"colId":203,"href":"nr.html?type=3","target":" target='_self'","colName":"下载专区","html":"<span class='itemName0'>下载专区<\/span>","title":""}];
var nav107SubMenu=[{"hidden":false,"colId":110,"href":"matchProject.html","target":" target='_self'","colName":"大赛报名","html":"<span class='itemName0'>大赛报名<\/span>","title":""},
                      {"hidden":false,"colId":110,"href":"trainItem.html","target":" target='_self'","colName":"培训报名","html":"<span class='itemName0'>培训报名<\/span>","title":""}
                    ];
var nav6SubMenu=[];

var _customBackgroundData = {"styleDefault":true,"s":true,"h":false,"r":3,"o":"","sw":-1,"e":0,"wbh":-1,"wbw":-1,"clw":-1,"crw":-1,"id":"","p":"","bBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"cBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"cmBg":{"y":0,"r":3,"f":"","p":"","c":"#000"},"bm":{},"cm":{},"cp":{"y":0}};          //自定义的数据
var _templateBackgroundData = {"id":"AD0I7vb9BBACGAAgwaKfvgUoj9LRMDCADzjoBw","bBg":{"y":1,"c":"#000","f":"","r":3,"p":""},"cBg":{"y":1,"c":"#000","f":"","r":3,"p":""},"cmBg":{"y":1,"c":"#000","f":"","r":3,"p":""},"s":false,"sw":1080,"r":8,"o":"#fafafa","h":false,"e":0,"wbh":-1,"wbw":-1,"clw":-1,"crw":-1,"p":"http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgwaKfvgUoj9LRMDCADzjoBw.jpg","bm":{},"cm":{},"cp":{"y":0}};// 模版的数据
var _useTemplateBanner = true;				// 是否使用全局模版
var _templateBannerData ={
    "ce": {
        "c1": "#000",
        "c2": "#FFFFFF"
    },
    "pl": 0,
    "t": 67,
    "bt": 2,
    "l": [
        {
            "i": "ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI",
            "p": "http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI.jpg",
            "w": 1084,
            "h": 310,
            "tp": "http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI!100x100.jpg"
        },
        {
            "i": "ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI",
            "p": "http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI.jpg",
            "w": 1100,
            "h": 308,
            "tp": "http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI!100x100.jpg"
        },
        {
            "i": "AD0I7vb9BBACGAAgwKKfvgUoidKD7gcwuAg4wgM",
            "p": "http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgwKKfvgUoidKD7gcwuAg4wgM.jpg",
            "w": 1080,
            "h": 450,
            "tp": "http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgwKKfvgUoidKD7gcwuAg4wgM!100x100.jpg"
        },
        {
            "i": "AD0I7vb9BBACGAAgx6KfvgUovMD90wcwuAg4wgM",
            "p": "http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgx6KfvgUovMD90wcwuAg4wgM.jpg",
            "w": 1080,
            "h": 450,
            "tp": "http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgx6KfvgUovMD90wcwuAg4wgM!100x100.jpg"
        },
        {
            "i": "ABUIABACGAAg3tmCwwUo6O-x4QMwxgc4mAI",
            "p": "http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg3tmCwwUo6O-x4QMwxgc4mAI.jpg",
            "w": 966,
            "h": 280,
            "tp": "http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg3tmCwwUo6O-x4QMwxgc4mAI!100x100.jpg"
        }
    ],
    "n": [
        {
            "t": 1,
            "i": "banner1",
            "e": 0, //0没有点击效果 1 有点击效果
            "u": "banner1",
            "ot": 0,
          //  "jType": 103,
          //  "jName": "http://www.baidu.com",
          //  "jUrl": "http://www.baidu.com",
            "p": baseUrl+"banner1.jpg?_",// +Math.random(),
            "w": 1100,
            "h": 300,
            "el": "",
            "er": ""
        },
        {
            "t": 1,
            "i": "banner2",
            "e": 0,  //0没有点击效果 1 有点击效果
            "u": "banner2",
            "ot": 1,
         //   "jType": 103,
         //   "jName": "http://www.baidu.com",
         //   "jUrl": "http://www.baidu.com",
            "p": baseUrl+"banner2.jpg?_",//+Math.random(),
            "w": 1100,
            "h": 300,
            "el": "",
            "er": ""
        },
        {
            "t": 1,
            "i": "banner3",
            "ot": 2,
            "e": 0,
            "u": "",
            "p": baseUrl+"banner3.jpg?_",//+Math.random(),
            "w": 1100,
            "h": 300,
            "el": "",
            "er": ""
        }
    ],
    "s": 4,
    "at": 10,
    "c": 2,
    "i": 4000,
    "a": 1500,
    "h": false,
    "o": false,
    "p": 0,
    "pt": 0,
    "ws2": false,
    "f": {

    },
    "ws": false
}


    //{"ce":{"c1":"#000","c2":"#FFFFFF"},"pl":0,"t":67,"bt":2,"l":[{"i":"ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI","p":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI.jpg","w":1084,"h":310,"tp":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI!100x100.jpg"},{"i":"ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI","p":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI.jpg","w":1100,"h":308,"tp":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI!100x100.jpg"},{"i":"AD0I7vb9BBACGAAgwKKfvgUoidKD7gcwuAg4wgM","p":"http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgwKKfvgUoidKD7gcwuAg4wgM.jpg","w":1080,"h":450,"tp":"http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgwKKfvgUoidKD7gcwuAg4wgM!100x100.jpg"},{"i":"AD0I7vb9BBACGAAgx6KfvgUovMD90wcwuAg4wgM","p":"http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgx6KfvgUovMD90wcwuAg4wgM.jpg","w":1080,"h":450,"tp":"http://10451822.s61i.faiusr.com/2/AD0I7vb9BBACGAAgx6KfvgUovMD90wcwuAg4wgM!100x100.jpg"},{"i":"ABUIABACGAAg3tmCwwUo6O-x4QMwxgc4mAI","p":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg3tmCwwUo6O-x4QMwxgc4mAI.jpg","w":966,"h":280,"tp":"http://12329909.s21i-12.faiusr.com/2/ABUIABACGAAg3tmCwwUo6O-x4QMwxgc4mAI!100x100.jpg"}],"n":[{"t":1,"i":"ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI","e":1,"u":"AGcI/////w8SFGh0dHA6Ly93d3cuYmFpZHUuY29t","ot":0,"jType":103,"jName":"http://www.baidu.com","jUrl":"http://www.baidu.com","p":"../img/banner/banner2.jpg","w":1100,"h":308,"el":"","er":""},{"t":1,"i":"ABUIABACGAAg8oLdwgUoodjI2wcwzAg4tAI","e":1,"u":"AGcI/////w8SFGh0dHA6Ly93d3cuYmFpZHUuY29t","ot":1,"jType":103,"jName":"http://www.baidu.com","jUrl":"http://www.baidu.com","p":"../img/banner/banner2.jpg","w":1100,"h":308,"el":"","er":""},{"t":1,"i":"ABUIABACGAAg19_CwwUomODUkwQwvAg4tgI","ot":2,"e":0,"u":"","p":"../img/banner/banner1.jpg","w":1084,"h":310,"el":"","er":""}],"s":4,"at":10,"c":2,"i":4000,"a":1500,"h":false,"o":false,"p":0,"pt":0,"ws2":false,"f":{},"ws":false};

var _pageBannerData = {"s":0,"i":4000,"a":1500,"h":false,"o":false,"t":1,"p":0,"pt":0,"pl":0,"bt":1,"ws2":false,"l":[],"f":{},"ce":{},"n":[],"c":3,"at":0,"ws":false};					// 当前页面的自定义数据（页面独立样式设置）
var _bannerData = _templateBannerData;

var _mallOpen = false;

var toolBoxShowView = false;
var toolBoxShowSet = false;

var _navStyleChanged = 0;
var _navItemOnCkOpen = false;					  // 有下级菜单不可点击
var _navStyleData = {"no":true,"ns":{"h":50,"w":-1},"np":{},"ncp":{"y":0,"t":150,"r":-1,"b":-1,"l":0,"hl":0,"ht":180},"nis":{"w":130,"h":50},"gt":{"y":1,"f":"微软雅黑","s":16,"w":0,"c":"#ffffff"},"ht":{"y":1,"c":"#ffffff"},"nb":{"y":2,"c":"#2b2b2b","f":"","r":0,"p":""},"nib":{"y":1,"c":"#c40000","r":0,"f":"","p":""},"nihb":{"y":2,"c":"#c40000","r":0,"f":"","p":""},"niss":{"w":8,"h":50},"nisb":{"c":"#000","r":0,"f":"","p":"","y":0},"nsigt":{"y":1,"f":"微软雅黑","s":14,"w":0,"c":"#ffffff","ta":0},"nsiht":{"y":1,"c":"#ffffff"},"nsis":{"w":130,"h":45},"nsib":{"y":2,"c":"#c40000","r":0,"f":"","p":""},"nsihb":{"y":2,"c":"#c40000","r":0,"f":"","p":""},"s":0,"cs":{"h":50,"w":-1},"cp":{"y":0,"t":-1,"l":-1},"cb":{"c":"#000","f":"","r":0,"p":"","y":0},"nsiho":30,"nmove":0,"v":2,"nsmt":{},"nsmb":{},"nrs":{"n":{"t":0},"c":{"t":0},"i":{"t":0},"smt":{"t":0},"smb":{"t":0},"si":{"t":0},"is":{"t":0},"sis":{"t":0},"tmt":{"t":0},"tmb":{"t":0},"ti":{"t":0},"tis":{"t":0}},"nsw":{"n":{"t":0},"c":{"t":0},"i":{"t":0},"sm":{"t":0},"si":{"t":0},"is":{"t":0},"sis":{"t":0}},"nbr":{"n":{"t":0},"i":{"t":0},"sm":{"t":0},"si":{"t":0},"is":{"t":0},"sis":{"t":0},"tm":{"t":0},"ti":{"t":0},"tis":{"t":0}},"ntmt":{},"ntmb":{}};				      // 栏目导航样式
var _navHidden =false;                                  //true:隐藏；flase：显示
var _navPositionFixTop =  true;        		  // 导航栏固定到顶部
var _navHeightChange = true;						  //导航栏高度改变，逻辑分界点2015-08-21
var _siteDemo = false;



var _backToTop = true;
var _aid = 12329909;
var _cloneAid = 10451822;
var _templateLayout = 1;
var _webBannerHeight = -1;
var _isTemplateVersion2 = true;
var _uiMode= false;
//20160817 jack smallLanguage flag
var _smallLanguage = false;
var _choiceCurrencyVal = "￥";
var _moduleAnimationPercent = -1;
//////////////////////////////////////////////////////////
var fk_old_onload = window.onload;
window.onload = function(){
    fkLogTime("window onload start");


    Site.cacheModuleFunc.runSiteInit();



    if(typeof fk_old_onload == "function"){
        fk_old_onload.apply(this, arguments);
    }




    Site.userReadyOperateSite();
    Site.pageOnload();
    //检查有没有带上Fai锚点
    Site.checkFaiAnchor();




    fkLogTime("window onload end");
};




$LAB.script("http://1.ss.faisys.com/js/photoSlide.min.js?v=201605161742");
$LAB.script("http://1.ss.faisys.com/js/imageEffect.min.js?v=201701061743")
    .wait(function () {
        jzUtils.trigger({
            "name": "ImageEffect.FUNC.BASIC.Init",
            "base":Site
        });
    });






fkLogTime("end body tartget of script load");


