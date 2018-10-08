var user;                     //当前用户

var headerhtml ="<div role=\"navigation\" class=\"zu-top\">\n" +
    "    <div class=\"zg-wrap modal-shifting clearfix\" id=\"zh-top-inner\">\n" +
    "        <a href=\"/index.html\" class=\"zu-top-link-logo\" id=\"zh-top-link-logo\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_zhihu_logo\">微软俱乐部</a>\n" +
    "\n" +
    "        <div class=\"top-nav-profile\">\n" +
    "            <ul class=\"topnav-noauth clearfix\" id=\"topnav-noauth-clearfix\"  >\n" +
    "                <li>\n" +
    "                    <a href=\"/login.html\">注册/登陆</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "\n" +
    "            <a href=\" \" class=\"zu-top-nav-userinfo \" id=\"zu-top-nav-userinfo\" role=\"button\" aria-haspopup=\"true\" aria-activedescendant=\"\" >\n" +
    "                <span class=\"name\" id = \"name\"></span>\n" +
    "                <img class=\"Avatar\" id=\"Avatar\" src=\" \">\n" +
    "                <span id=\"zh-top-nav-new-pm\" class=\"zg-noti-number zu-top-nav-pm-count\" style=\"visibility:hidden\" data-count=\"0\">\n" +
    "                    </span>\n" +
    "            </a>\n" +
    "\n" +
    "            <ul class=\"top-nav-dropdown\" id=\"top-nav-profile-dropdown\"  aria-labelledby=\":0\">\n" +
    "                <li>\n" +
    "                    <a href=\" \" tabindex=\"-1\" id=\"user-index\">\n" +
    "                        <i class=\"zg-icon zg-icon-dd-home\"></i>我的主页\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a href=\"/msg/list\" tabindex=\"-1\" id=\":2\">\n" +
    "                        <i class=\"zg-icon zg-icon-dd-pm\"></i>私信\n" +
    "                        <span id=\"zh-top-nav-pm-count\" class=\"zu-top-nav-pm-count zg-noti-number\" style=\"visibility:hidden\" data-count=\"0\">\n" +
    "                    </span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <a  tabindex=\"-1\" id=\":4\" onclick = logout()>\n" +
    "                        <i class=\"zg-icon zg-icon-dd-logout\"></i>退出\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <button class=\"zu-top-add-question\" id=\"zu-top-add-question\"  onclick=\"onclickPublic()\">提问</button>\n" +
    "\n" +
    "        <div role=\"search\" id=\"zh-top-search\" class=\"zu-top-search\">\n" +
    "            <form method=\"GET\" action=\"https://nowcoder.com/search\" id=\"zh-top-search-form\" class=\"zu-top-search-form\">\n" +
    "                <input type=\"hidden\" name=\"type\" value=\"content\">\n" +
    "                <label for=\"q\" class=\"hide-text\">搜索</label><input type=\"text\" class=\"zu-top-search-input\" id=\"q\" name=\"q\" autocomplete=\"off\" value=\"\" placeholder=\"搜索你感兴趣的内容...\" role=\"combobox\" aria-autocomplete=\"list\">\n" +
    "                <button type=\"submit\" class=\"zu-top-search-button\"><span class=\"hide-text\">搜索</span><span class=\"sprite-global-icon-magnifier-dark\"></span></button>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div id=\"zg-top-nav\" class=\"zu-top-nav\">\n" +
    "            <ul class=\"zu-top-nav-ul zg-clear\">\n" +
    "                <li class=\"zu-top-nav-li current\" id=\"zh-top-nav-home\">\n" +
    "                    <a class=\"zu-top-nav-link\" href=\"/question.html\" id=\"zh-top-link-home\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_home\">首页</a>\n" +
    "                </li>\n" +
    "                <li class=\"zu-top-nav-li\" id=\"navigation-blog\">\n" +
    "                    <a class=\"zu-top-nav-link\" href=\"/index.html\" id=\"zh-top-link-home\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_home\">技术博客</a>\n" +
    "                </li>\n" +
    "                <li class=\"zu-top-nav-li\" id=\"navigation-news\">\n" +
    "                    <a class=\"zu-top-nav-link\" href=\"/index.html\" id=\"zh-top-link-home\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_home\">新闻</a>\n" +
    "                </li>\n" +
    "                <li class=\"zu-top-nav-li\" id=\"navigation-activity\">\n" +
    "                    <a class=\"zu-top-nav-link\" href=\"/index.html\" id=\"zh-top-link-home\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_home\">活动</a>\n" +
    "                </li>\n" +
    "                <li class=\"zu-top-nav-li\" id=\"navigation-question\">\n" +
    "                    <a class=\"zu-top-nav-link\" href=\"/index.html\" id=\"zh-top-link-home\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_home\">技术讨论</a>\n" +
    "                </li>\n" +
    "                <li class=\"zu-top-nav-li\" id=\"navigation-programming\">\n" +
    "                    <a class=\"zu-top-nav-link\" href=\"/index.html\" id=\"zh-top-link-home\" data-za-c=\"view_home\" data-za-a=\"visit_home\" data-za-l=\"top_navigation_home\">算法编程</a>\n" +
    "                </li>\n" +
    // "            <ul class=\"top-nav-dropdown\" id=\"top-nav-navigation-dropdown\"  aria-labelledby=\":0\">\n" +
    // "                </li>\n" +
    //
    // "\n" +
    // "                <li class=\"top-nav-noti zu-top-nav-li \" id=\"top-nav-noti-zu-top-nav-li\" >\n" +
    // "                    <a class=\"zu-top-nav-link\" href=\"#\" id=\"zh-top-nav-count-wrap\" role=\"button\"><span class=\"mobi-arrow\"></span>消息<span id=\"zh-top-nav-count\" class=\"zu-top-nav-count zg-noti-number\" style=\"display: none;\">0</span></a>\n" +
    // "                </li>\n" +
    "\n" +
    "            </ul>\n" +
    "\n" +
    "            <div class=\"zu-top-nav-live zu-noti7-popup zg-r5px no-hovercard\" id=\"zh-top-nav-live-new\" role=\"popup\" tabindex=\"0\">\n" +
    "                <div class=\"zu-top-nav-live-inner zg-r5px\">\n" +
    "                    <div class=\"zu-top-live-icon\">&nbsp;</div>\n" +
    "                    <div class=\"zu-home-noti-inner\" id=\"zh-top-nav-live-new-inner\">\n" +
    "                        <div class=\"zm-noti7-popup-tab-container clearfix\" tabindex=\"0\" role=\"tablist\">\n" +
    "                            <button class=\"zm-noti7-popup-tab-item message\" role=\"tab\">\n" +
    "                                <span class=\"icon\">消息</span>\n" +
    "                            </button>\n" +
    "                            <button class=\"zm-noti7-popup-tab-item user\" role=\"tab\">\n" +
    "                                <span class=\"icon\">用户</span>\n" +
    "                            </button>\n" +
    "                            <button class=\"zm-noti7-popup-tab-item thanks\" role=\"tab\">\n" +
    "                                <span class=\"icon\">赞同和感谢</span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"zm-noti7-frame-border top\"></div>\n" +
    "                    <div class=\"zm-noti7-frame\">\n" +
    "                        <div class=\"zm-noti7-content message zh-scroller\" style=\"position: relative; overflow: hidden;\">\n" +
    "                            <div class=\"zh-scroller-inner\" style=\"height: 100%; width: 150%; overflow: auto;\"><div class=\"zh-scroller-content\" style=\"position: static; display: block; visibility: visible; overflow: hidden; width: 315px; min-height: 100%;\">\n" +
    "                                <div class=\"zm-noti7-content-inner\">\n" +
    "                                    <div class=\"zm-noti7-content-body\">\n" +
    "                                        <div class=\"zm-noti7-popup-loading\">\n" +
    "                                            <span class=\"noti-spinner-loading\"></span>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div></div>\n" +
    "                            <div class=\"zh-scroller-bar-container\" style=\"position: absolute; right: 1px; top: 0px; height: 98px; width: 6px; border: 1px solid rgb(68, 68, 68); opacity: 0; cursor: default; border-radius: 2px; -webkit-user-select: none; background: rgb(102, 102, 102);\"><div style=\"-webkit-user-select: none;\"></div></div><div class=\"zh-scroller-bar\" style=\"position: absolute; right: 2px; top: 2px; opacity: 0.5; width: 6px; border-radius: 3px; cursor: default; -webkit-user-select: none; display: none; background: rgb(0, 0, 0);\"></div>\n" +
    "                        </div>\n" +
    "                        <div class=\"zm-noti7-content user zh-scroller\" style=\"display: none; position: relative; overflow: hidden;\"><div class=\"zh-scroller-inner\" style=\"height: 100%; width: 150%; overflow: auto;\"><div class=\"zh-scroller-content\" style=\"position: static; display: block; visibility: visible; overflow: hidden; width: 315px; min-height: 100%;\">\n" +
    "                            <div class=\"zm-noti7-content-inner\">\n" +
    "                                <div class=\"zm-noti7-content-body\">\n" +
    "                                    <div class=\"zm-noti7-popup-loading\">\n" +
    "                                        <span class=\"noti-spinner-loading\"></span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div></div><div class=\"zh-scroller-bar-container\" style=\"position: absolute; right: 1px; top: 0px; height: 98px; width: 6px; border: 1px solid rgb(68, 68, 68); opacity: 0; cursor: default; border-radius: 2px; -webkit-user-select: none; background: rgb(102, 102, 102);\"><div style=\"-webkit-user-select: none;\"></div></div><div class=\"zh-scroller-bar\" style=\"position: absolute; right: 2px; top: 2px; opacity: 0.5; width: 6px; border-radius: 3px; cursor: default; -webkit-user-select: none; display: none; background: rgb(0, 0, 0);\"></div></div>\n" +
    "                        <div class=\"zm-noti7-content thanks zh-scroller\" style=\"display: none; position: relative; overflow: hidden;\"><div class=\"zh-scroller-inner\" style=\"height: 100%; width: 150%; overflow: auto;\"><div class=\"zh-scroller-content\" style=\"position: static; display: block; visibility: visible; overflow: hidden; width: 315px; min-height: 100%;\">\n" +
    "                            <div class=\"zm-noti7-content-inner\">\n" +
    "                                <div class=\"zm-noti7-content-body\">\n" +
    "                                    <div class=\"zm-noti7-popup-loading\">\n" +
    "                                        <span class=\"noti-spinner-loading\"></span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div></div><div class=\"zh-scroller-bar-container\" style=\"position: absolute; right: 1px; top: 0px; height: 98px; width: 6px; border: 1px solid rgb(68, 68, 68); opacity: 0; cursor: default; border-radius: 2px; -webkit-user-select: none; background: rgb(102, 102, 102);\"><div style=\"-webkit-user-select: none;\"></div></div><div class=\"zh-scroller-bar\" style=\"position: absolute; right: 2px; top: 2px; opacity: 0.5; width: 6px; border-radius: 3px; cursor: default; -webkit-user-select: none; display: none; background: rgb(0, 0, 0);\"></div></div>\n" +
    "                    </div>\n" +
    "                    <div class=\"zm-noti7-frame-border bottom\"></div>\n" +
    "                    <div class=\"zm-noti7-popup-footer\">\n" +
    "                        <a href=\"https://nowcoder.com/notifications\" class=\"zm-noti7-popup-footer-all zg-right\">查看全部 »</a>\n" +
    "                        <a href=\"https://nowcoder.com/settings/notification\" class=\"zm-noti7-popup-footer-set\" title=\"通知设置\"><i class=\"zg-icon zg-icon-settings\"></i></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"

function onloadHeader() {     //加载网页头部
    var json ={};
    json.id = 1;
    var data=JSON.stringify(json);
    $.ajax({                   //获取当前的用户
        type:"POST",
        url:"/user/getUser",
        data:data,
        contentType:"application/json",
        error : function(){
            alert('smx失败 ');
        },
        success:function(data1){
            window.user = data1.data;
            var userId =-1;
            var userName = '';
            var headUrl = '';
            if(user!=null){
                userId = window.user.id;
                userName = window.user.nickname;
                headUrl =window.user.headUrl;
            }

            document.getElementById('header').innerHTML = headerhtml;



            if(userId==-1)  //用户未登录
            {
                document.getElementById("topnav-noauth-clearfix").style.display = "block";
                document.getElementById("zu-top-nav-userinfo").style.display = "none";
                document.getElementById("zu-top-add-question").style.display = "none";
                // document.getElementById("top-nav-noti-zu-top-nav-li").style.display = "none";
                document.getElementById("top-nav-profile-dropdown").style.display = "none";

            }
            else
            {
                document.getElementById("topnav-noauth-clearfix").style.display = "none";
                document.getElementById("zu-top-nav-userinfo").style.display = "block";
                document.getElementById("zu-top-nav-userinfo").href = "/user/"+user.id;
                document.getElementById("name").innerHTML = user.nickname;
                document.getElementById("Avatar").src = user.headUrl;
                document.getElementById("user-index").href = "/user/"+user.id;
                document.getElementById("zu-top-add-question").style.display = "block";
                // document.getElementById("top-nav-noti-zu-top-nav-li").style.display = "block";

            }

        }
    });
}

function logout() {
    var json ={};
    json.id = 1;
    var data=JSON.stringify(json);
    $.ajax({                   //获取当前的用户
        type: "POST",
        url: "/user/logout",
        data: data,
        contentType: "application/json",
        error: function () {
            alert('smx失败 ');
        },
        success: function (data) {
            if(data.status==200){
                alert('成功退出！');
                delAllCookie();
                location.reload(true);
            }else{
                alert('您还没有登录！')
            }

        }
    })

}

function getCookie($name){
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
        var varName=dataArray[i].split("=");
        if(varName[0]==$name){
            return decodeURI(varName[1]);
        }

    }
}
//删除cookie中所有定变量函数
function delAllCookie(){
    var myDate=new Date();
    myDate.setTime(-1000);//设置时间
    var data=document.cookie;
    var dataArray=data.split("; ");
    for(var i=0;i<dataArray.length;i++){
        var varName=dataArray[i].split("=");
        document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();
    }

}