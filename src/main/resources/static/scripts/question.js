var user;                     //当前用户
// var question;                  //当前技术帖
var questionCommentId;            //当前评论帖id

function onloadQuestion() {   //加载数据库中的问题
    var json = {};
    json.offset = 0;
    json.limit = 10;
    var data = JSON.stringify(json);
    $.ajax({                   //获取当前的用户
        type: "POST",
        url: "/question/onLoad",
        data: data,
        contentType: "application/json",
        error: function () {
            alert('smx失败 ');
        },
        success: function (data1) {
            var quetionList = Array();
            quetionList = data1.data;


            var html = '';
            for (var i = 0; i < quetionList.length; i++) {
                var div = "<div class=\'feed-item folding feed-item-hook feed-item-2" + "\' feed-item-a=\'\' data-type=\'a\' id=\'feed-2\' data-za-module=\'FeedItem\' data-za-index=\'\'>"
                    + "<meta itemprop=\'ZReactor\' data-id=\'389034\' data-meta=\'{&quot;source_type&quot;: &quot;promotion_answer&quot;, &quot;voteups&quot;: 4168, &quot;comments&quot;: 69, &quot;source&quot;: []}\'>"
                    + "<div class=\'feed-item-inner\'>" + "<div class=\'avatar\'>" + "<a title=\'" + quetionList[i].title + "' data-tip='p$t$amuro1230' class='zm-item-link-avatar' target='_blank' href='https://nowcoder.com/people/amuro1230'>"
                    + "<img src=\'" + quetionList[i].headUrl + "\' class=\'zm-item-img-avatar\'></a>" + "</div>" + "<div class=\'feed-main\'>" + "<div class=\'feed-content\' data-za-module=\'AnswerItem\'>" + "<meta itemprop=\'answer-id\' content=\'389034\'>" + "<meta itemprop=\'answer-url-token\' content=\'13174385\'>" + "<h2 class=\'feed-title\'>" + "<a class=\'question_link\' target=\'_blank\' href=\'/question/" + quetionList[i].id + "\'>" + quetionList[i].title + "</a></h2>" + "<div class=\'feed-question-detail-item\'>" + "<div class=\'question-description-plain zm-editable-content\'></div>" + "</div>" + "<div class=\'expandable entry-body\'>" + "<div class=\'zm-item-vote\'>"
                    + "<a class=\'zm-item-vote-count js-expand js-vote-count\' href=\'javascript:;\' data-bind-votecount=\'\'>" + quetionList[i].likeCount + "</a></div>" + "<div class=\'zm-item-answer-author-info\'>" + "<div class=\'zm-item-answer-author-info\'>"
                    + "<a class=\'author-link\' data-tip=\'p$b$amuro1230\' target=\'_blank\' href=\'/user/" + quetionList[i].userId + "\'>" + quetionList[i].nickname + "</a>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + quetionList[i].createTime + "</div>" + "<div class=\'zm-item-vote-info\' data-votecount=\'4168\' data-za-module=\'VoteInfo\'>" + "<span class=\'voters text\'>" + "<a href=\'#\' class=\'more text\'>" + "<span class=\'js-voteCount\'>" + quetionList[i].likeCount + "</span>&nbsp;人赞同</a></span>" + "</div>" + "<div class=\'zm-item-rich-text expandable js-collapse-body\' data-resourceid=\'123114\' data-action=\'/answer/content\' data-author-name=\'李淼\' data-entry-url=\'/question/19857995/answer/13174385\'>"
                    + "<a class=\'zh-summary summary clearfix\' href='questionDetail.html?questionId=" + quetionList[i].id + "'>" + quetionList[i].content + "</a>" + "  </div>" + "</div>" + "<div class=\'feed-meta\'>" + "<div class=\'zm-item-meta answer-actions clearfix js-contentActions\'>"
                    + "<div class=\'zm-meta-panel\'>" + "<a data-follow=\'q:link\' class=\'follow-link zg-follow meta-item\' href=\'javascript:;\' id=\'sfb-123114\'>" + "<i class=\'z-icon-follow\'></i>关注问题</a>"
                    + "<a href=\'#\' name=\'addcomment\' class=\'meta-item toggle-comment js-toggleCommentBox\'>" + "<i class=\'z-icon-comment\'></i>" + quetionList[i].commentCount + "条评论</a>" + "<button class=\'meta-item item-collapse js-collapse\'>"
                    + "  <i class=\'z-icon-fold\'></i>收起</button>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>";
                html += div;
            }
            document.getElementById('js-home-feed-list').innerHTML = html;


        }

    });
}

function publicQuestion() {    //发布问题
    var title = $("#question-title").val();
    var content = $("#question-content").val();
    var json = {};
    json.title = title;
    json.content = content;
    if (title == "") {
        alert("请填写标题");
    } else if (content == "") {
        alert("请填写内容");
    } else {
        var data = JSON.stringify(json);
        $.ajax({
            type: "POST",
            url: "/question/public",
            data: data,
            contentType: "application/json",
            success: function (data) {
                var data1 = data;
                if (data1.status == 200) {
                    alert("发布成功！");
                    window.location.href = 'question.html';
                    document.getElementById("zh-add-question-form").style.display = "none";
                    document.getElementById("display-question").style.display = "";
                } else {
                    alert("发布失败！");
                }
            }
        });
    }
}

function cancelPublicQuestion() {
    document.getElementById("zh-add-question-form").style.display = "none";
    document.getElementById("display-question").style.display = "";
}

function onclickPublic() {
    document.getElementById("zh-add-question-form").style.display = "";
    document.getElementById("display-question").style.display = "none";
}

function onloadQuestionDetail() {      //加载问题详情页
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    var json = {};
    json.questionId = loc;
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/onLoadDetail",
        data: data,
        contentType: "application/json",
        error: function () {
            alert("ajx失败!");
        },
        success: function (data) {
            question = data.data;
            document.getElementById('question-detail-title').innerHTML = question.title;
            document.getElementById('question-detail-content').innerHTML = question.content;


        }
    });

}

function onloadQuestionComment() {      //加载问题评论
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    var json = {};
    json.offset = 0;
    json.limit = 10;
    json.entityId = loc;
    json.entityType = 0;   //有待改善，此处的entityType指的是评论对应的问题类型
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/questionComment/onLoad",
        data: data,
        contentType: "application/json",
        error: function () {
            alert("ajx失败!");
        },
        success: function (data) {
            var questionCommentList = Array();
            questionCommentList = data.data;
            var html = '';
            for (var i = 0; i < questionCommentList.length; i++) {
                var div = "<div tabindex=\"-1\" class=\"zm-item-answer  zm-item-expanded\" itemprop=\"topAnswer\" itemscope=\"\"\n" +
                    "                     itemtype=\"http://schema.org/Answer\" data-aid=\"22162611\" data-atoken=\"66862039\" data-collapsed=\"0\"\n" +
                    "                     data-created=\"1444310527\" data-deleted=\"0\" data-helpful=\"1\" data-isowner=\"0\" data-copyable=\"1\"\n" +
                    "                     data-za-module=\"AnswerItem\">\n" +
                    "                    <link itemprop=\"url\" href=\"\">\n" +
                    "                    <meta itemprop=\"answer-id\" content=\"22162611\">\n" +
                    "                    <meta itemprop=\"answer-url-token\" content=\"66862039\">\n" +
                    "                    <a class=\"zg-anchor-hidden\" name=\"answer-22162611\"></a>\n" +
                    "                    <div class=\"zm-votebar goog-scrollfloater js-vote\" data-id=\"" + questionCommentList[i].id + "\">\n" +
                    "                        <button id=\"questionCommentLike" + questionCommentList[i].id + "\" class=\"up\" aria-pressed=\"true\" title=\"赞同\" onclick='addQuestionCommentLike(this.id)'>\n" +
                    "                            <i class=\"icon vote-arrow\"></i>\n" +
                    "                            <span id=\"questionLike" + questionCommentList[i].id + "\" class=\"count\">" + questionCommentList[i].likeCount + "</span>\n" +
                    "                            <span  class=\"label sr-only\">赞同</span></button>\n" +
                    "                        <button id=\"questionCommentDislike" + questionCommentList[i].id + "\" class=\"down\" aria-pressed=\"false\" title=\"反对\" onclick='addQuestionCommentLike(this.id)'>\n" +
                    "                            <i class=\"icon vote-arrow\"></i>\n" +
                    "                            <span class=\"label sr-only\">反对，不会显示你的姓名</span></button>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"answer-head\">\n" +
                    "                        <div class=\"zm-item-answer-author-info\">\n" +
                    "                            <a class=\"zm-item-link-avatar avatar-link\" href=\"\" target=\"_blank\"\n" +
                    "                               data-tip=\"p$t$yingxiaodao\">\n" +
                    "                                <img src=\"" + questionCommentList[i].headUrl + "\"\n" +
                    "                                     class=\"zm-list-avatar avatar\"></a>\n" +
                    "                            <a class=\"author-link\" target=\"_blank\" href=\"/user/" + questionCommentList[i].userId + "\">" + questionCommentList[i].nickname + "</a>\n" +
                    "                            </div>\n" +
                    "                        <div class=\"zm-item-vote-info\" data-votecount=\"28\" data-za-module=\"VoteInfo\">\n" +
                    "                                <span class=\"voters text\">\n" +
                    "                                    <a href=\"\" class=\"more text\">\n" +
                    "                                        <span class=\"js-voteCount\">" + questionCommentList[i].likeCount + "</span>&nbsp;人赞同</a></span>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                    <div class=\"zm-item-rich-text expandable js-collapse-body\" data-resourceid=\"6727688\"\n" +
                    "                         data-action=\"/answer/content\" data-author-name=\"营销岛\"\n" +
                    "                         data-entry-url=\"/question/36301524/answer/66862039\">\n" +
                    "                        <div class=\"zm-editable-content clearfix\">\n" +
                    "                            " + questionCommentList[i].content + "\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                    <a class=\"zg-anchor-hidden ac\" name=\"22162611-comment\"></a>\n" +
                    "                    <div class=\"zm-item-meta answer-actions clearfix js-contentActions\">\n" +
                    "                        <div class=\"zm-meta-panel\">\n" +
                    "                            <a itemprop=\"url\" class=\"answer-date-link meta-item\" target=\"_blank\" href=\"\">发布于\n" +
                    "                                " + questionCommentList[i].createTime + "</a>\n" +
                    "\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>";
                html += div;
            }
            document.getElementById('zh-question-answer-wrap').innerHTML = html;


        }
    });

}


function publicQuestionComment() {       //发布问题评论
    var content = $("#question-comment-content").val();
    if ($.isEmptyObject(user)) {
        alert("您还未登录，请先登录再发表评论！");
        return;
    }
    var json = {};
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    json.entityId = loc;
    json.entityType = 0;
    json.userId = user.id;
    json.content = content;
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/publicQuestionComment",
        data: data,
        contentType: "application/json",
        success: function (data) {
            if (data.status == 200) {
                alert("发表评论成功！");
                window.location.href = 'questionDetail.html?questionId=' + loc;
            } else {
                alert("评论失败！");
            }
        }
    });

}

//点赞点踩
function addQuestionCommentLike(id) {
    if ($.isEmptyObject(user)) {
        alert("您还未登录，请先登录再点赞！");
        return;
    }
    var str = id;
    var isLike = 0;
    if (str.match("Like")) {
        isLike = 0;
    }
    if (str.match("Dislike")) {
        isLike = 1;
    }
    var entityId = str.substring(str.lastIndexOf('_') + 1, str.length);
    var json = {};
    json.isLike = isLike;
    json.entityType = 1;//1代表对评论点赞
    json.entityId = entityId;
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/addQuestionLike",
        data: data,
        contentType: "application/json",
        success: function (data) {
            if (data.status == 200) {
                document.getElementById("questionLike" + entityId).innerHTML = data.data;
                if(isLike==0){    //显示点赞
                    document.getElementById("questionComment2Like_" + entityId).style.background = "#8c8c8c";
                }
                if(isLike==1){    //显示点赞
                    document.getElementById("questionComment2Like_" + entityId).style.background = "white";
                }
            } else {
                alert("点赞失败！");
            }
        }
    });

}

function onloadQuestion1() {
    // document.getElementById('publicName').innerHTML = "发帖";
    // document.getElementById('publicName').href = "pubQuestion.html";

    var json = {};
    json.offset = 0;
    json.limit = 10;
    var data = JSON.stringify(json);
    $.ajax({                   //获取当前的用户
        type: "POST",
        url: "/question/onLoad",
        data: data,
        contentType: "application/json",
        error: function () {
            alert('smx失败 ');
        },
        success: function (data1) {
            var questionList = Array();
            questionList = data1.data;
            var temp ={};
            temp.question=data1.data;

            $("#each_question").tmpl(temp).appendTo("#discuss_list");
        }
    });
}

function onloadQuestionDetail1() {      //加载问题详情页
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    var json = {};
    json.questionId = loc;
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/onLoadDetail",
        data: data,
        contentType: "application/json",
        error: function () {
            alert("ajx失败!");
        },
        success: function (data) {
            question = data.data;
            document.getElementById('question-detail-title').innerHTML = question.title;
            document.getElementById('question-detail-content').innerHTML = question.content;
            document.getElementById('question-detail-time').innerHTML = question.createTime;
            document.getElementById("question-author-headUrl").src = question.headUrl;
            document.getElementById("comment-avatar-headUrl").src = question.headUrl;
            document.getElementById('question-author-name').innerHTML = question.nickname;
            document.getElementById('comment-count').innerHTML = question.commentCount;

        }
    });
}

function onloadQuestionComment1() {      //加载问题评论
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    var json = {};
    json.offset = 0;
    json.limit = 10;
    json.entityId = loc;
    json.entityType = 0;   //有待改善，此处的entityType指的是评论对应的问题类型
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/questionComment/onLoad",
        data: data,
        contentType: "application/json",
        error: function () {
            alert("ajx失败!");
        },
        success: function (data) {
            var questionCommentList = data.data;
            var temp ={};
            temp.questionComment=data.data;
            $("#each_question_comment").tmpl(temp).appendTo("#question-comment-list");

            var i =0;
            for(i=0;i<questionCommentList.length;i++) {
                var text=questionCommentList[i].content;
                $("#appendTest"+questionCommentList[i].id).val(text);//将需要转换的内容加到转换后展示容器的textarea隐藏标签中

                //转换开始,第一个参数是上面的div的id
                editormd.markdownToHTML("testEditorMdview"+questionCommentList[i].id, {
                    htmlDecode: "style,script,iframe", //可以过滤标签解码
                    // emoji: true,
                    // taskList: true,
                    // tex: true,               // 默认不解析
                    // flowChart: true,         // 默认不解析
                    // sequenceDiagram: true,  // 默认不解析
                });
            }


        }
    });
}

function publishComment(){
    var content = document.getElementById("comment-content").value;

    if ($.isEmptyObject(user)) {
        alert("您还未登录，请先登录再发表评论！");
        return;
    }
    var json = {};
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    json.entityId = loc;
    json.entityType = 0;
    json.userId = user.id;
    json.content = content;
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/publicQuestionComment",
        data: data,
        contentType: "application/json",
        success: function (data) {
            if (data.status == 200) {
                alert("发表评论成功！");
                window.location.href = 'questionDetail1.html?questionId=' + loc;
            } else {
                alert("评论失败！");
            }
        }
    });

}
function publishReply(){
    var content = document.getElementById("comment-content-reply").value;
    if ($.isEmptyObject(user)) {
        alert("您还未登录，请先登录再发表评论！");
        return;
    }
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=') + 1, url.length);
    var json = {};
    json.entityId = questionCommentId;
    json.entityType = 1;//1表示对评论的评论
    json.userId = user.id;
    json.content = content;
    var data = JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/question/publicQuestionComment",
        data: data,
        contentType: "application/json",
        success: function (data) {
            if (data.status == 200) {
                alert("发表评论成功！");
                window.location.href = 'questionDetail1.html?questionId=' + loc;
            } else {
                alert("评论失败！");
            }
        }
    });

}

function cancelPublicReply(){

}


