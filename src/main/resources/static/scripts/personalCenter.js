
var user;              //当前用户
var image = '';         //用户上传的头像
var file;                //图片文件

//我的信息------------------------------------------------------------------------------------------------------------
function submitPersonalMessage(){   //提交个人信息
    var json={};
    //nickname
    var inputNickname=document.getElementById("personalCenter-nickname");
    if(inputNickname!=null && document.getElementById("personalCenter-nickname").value!="")
        json.nickname=document.getElementById("personalCenter-nickname").value;
    //sex
    var sex=document.getElementsByName("el-radio-button__orig-radio");
    for(var i=0;i<sex.length;i++){
        if(sex[i].checked==true){
            json.sex=sex[i].value;
            break;
        }
    }
    //birthday
    if($('#personalCenter-date')!=null)
        json.birthday=$('#personalCenter-date').val();   //2018-08-09
    //school
    var inputSchool=document.getElementById("personalCenter-school");
    if(inputSchool!=null && document.getElementById("personalCenter-school").value!="")
        json.school=document.getElementById("personalCenter-school").value;
    //hobby
    var inputhobby=document.getElementById("personalCenter-hobby");
    if(inputhobby!=null && document.getElementById("personalCenter-hobby").value!="")
        json.hobby=document.getElementById("personalCenter-hobby").value;

    var data=JSON.stringify(json);

    if($.isEmptyObject(user)){
        alert("请先登录");
        return;
    }

    // if($.isEmptyObject(json.nickname)){
    //     alert("请先输入");
    //     return;
    // }

    $.ajax({
        type: "POST",
        url: "/user/personalCenter/editPersonalInformation",
        data: data,
        contentType: "application/json",
        error: function () {
            alert('smx失败 ');
        },
        success: function (data1) {
            if(data1.status==200){
                alert("修改成功");
                location.reload();
            }
            else{
                alert("修改失败");
            }
        }
    });
}

function onloadPersonalMessage(){
    var url = window.location.search;
    var loc = url.substring(url.lastIndexOf('=')+1, url.length);
    var json ={};
    json.id = 1;
    var data=JSON.stringify(json);
    $.ajax({
        type:"POST",
        url:"/user/getUser",
        data:data,
        contentType:"application/json",
        error : function(){
            alert('smx失败 ');
        },
        success:function(data1){
            for(var i=0;i<7;i++){
                if(i==loc)
                    document.getElementById('personalCenter-right'+i).style.display = "";
                else
                    document.getElementById('personalCenter-right'+i).style.display = "none";
                document.getElementById('personalCenter-right').style.display = "none";
            }
            window.user = data1.data;


            if(loc==0){                                    // 首页
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else{

                }
            }

            if (loc==1) {                                  // 我的信息
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else {
                    var nickname = user.nickname;
                    var id = user.email;
                    var sex1 = user.sex;
                    var birthday1 = user.birthdayString;
                    var school = user.school;
                    var hobby = user.hobby;

                    if (user != null) {
                        //nickname
                        document.getElementById("personalCenter-nickname").setAttribute("placeholder", nickname);
                        //id
                        document.getElementById("personalCenter-Id").innerHTML = id;
                        //sex
                        if (sex1 == 1)
                            var sex = "男";
                        else if (sex1 == 2)
                            sex = "女";
                        else
                            sex = "保密";
                        $(":radio[name='el-radio-button__orig-radio'][value='" + sex + "']").prop("checked", "checked");
                        //birthday
                        if (birthday1 != undefined) {
                            $('#personalCenter-date').val(birthday1);
                        }
                        //school
                        if (school != undefined)
                            document.getElementById("personalCenter-school").setAttribute("placeholder", school);
                        //hobby
                        if (hobby != undefined)
                            document.getElementById("personalCenter-hobby").setAttribute("placeholder", hobby);

                    }
                }
            }

            if(loc==2){                                  // 我的头像
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else {
                    var headUrl = user.headUrl;
                    // $("#face-g-avatar").attr("src",headUrl);
                    $("#pre-container").css("background-image", "url(" + headUrl + ")");

                    document.getElementById("file_input").addEventListener("change", readImg, false);
                    // $('input[type="file"]').on('change',uploadImage);
                }
            }

            if(loc==3){                                  // 修改密码
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else{

                }
            }

            if(loc==4){                                  // 黑名单管理
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else{

                }
            }

            if(loc==5){                                  // 我的消息
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else{
                    var json = {};
                    json.commentPage = 1;
                    var data = JSON.stringify(json);
                    if($.isEmptyObject(user)){
                        window.location.href="login.html";
                        return;
                    }
                    else {
                        $.ajax({
                            type: "POST",
                            url: "/message/personalCenter/getUserComment",
                            data: data,
                            contentType: "application/json",
                            error: function () {
                                alert('smx失败 ');
                            },
                            success: function (data1) {
                                if(data1.status==999){
                                    alert(data1.msg);
                                }
                                else {
                                    var temp = {};
                                    temp.systemMessage = data1.data[1];
                                    temp.commentAmount = data1.data[0];
                                    temp.commentActive = data1.data[2][0];
                                    temp.commentBeforeArrow = data1.data[2][1];
                                    temp.commentAfterArrow = data1.data[2][2];
                                    $("#systemMessage").tmpl(temp).appendTo("#list-group-comment");
                                }
                            }
                        })
                    }
                }
            }

            if(loc==6){                                  // 我的收藏
                if($.isEmptyObject(user)){
                    window.location.href="login.html";
                    return;
                }
                else{

                }
            }


        }


    })
}

//我的头像------------------------------------------------------------------------------------------------------------
function readImg() {
    file = this.files[0];
    if( file.size > 2*1024*1024 ){  //用size属性判断文件大小不能超过5M
        alert( "你上传的文件太大了！" )
    }
    else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            document.getElementById("img-container").innerHTML = '<img width="180"  height="180" src="' + this.result + '" alt=""/>';
            image = this.result;
        }
    }
}

function uploadImage() {
    var formData = new FormData($("#upLoadForm")[0]);
    $.ajax({
        type:"POST",
        url: "/user/personalCenter/editPersonalHead",
        data: formData,
        dataType: "json",
        async: false,
        cache: false,
        contentType:false,
        processData: false,
        success: function(data){
            if(data.status==200){
                    alert("修改成功");
                    location.reload();
                }
                else{
                    alert("修改失败");
                }
            },
        error: function(err){
                alert('通信故障');
            }
        });

}

//我的消息------------------------------------------------------------------------------------------------------------
//-------评论---------------------------------------------------------------------------------
function personalCenter_comment(){
    document.getElementById('personal-center-comment').className="active";
    document.getElementById('personal-center-message').className=" ";
    document.getElementById('personal-center-system-message').className=" ";
    document.getElementById('list-group-comment').style.display = "";
    document.getElementById('list-group-message').style.display = "none";
    document.getElementById('list-group-system-message').style.display = "none";
}
function readMessage(id,entityType,entityId){
    var json={};
    json.commentId=id;
    var data=JSON.stringify(json);
    $.ajax({
        type: "POST",
        url: "/message/personalCenter/readComment",
        data: data,
        contentType: "application/json",
        error: function () {
            alert('smx失败 ');
        },
        success: function (data1) {
            // alert(data1.msg);
            if (entityType==1)
                window.location="blogDetail.html?blogId="+entityId;
            else if (entityType==2)
                window.location="questionDetail1.html?questionId="+entityId;
    }
    })
}
function commentChangePage(limit){
        var json = {};
        json.commentPage = limit;
        var data = JSON.stringify(json);
        $.ajax({
            type: "POST",
            url: "/message/personalCenter/getUserComment",
            data: data,
            contentType: "application/json",
            error: function () {
                alert('smx失败 ');
            },
            success: function (data1) {
                if (data1.status == 999) {
                    alert(data1.msg);
                }
                else {
                    document.getElementById('list-group-comment').innerHTML="";
                    var temp = {};
                    temp.systemMessage = data1.data[1];
                    temp.commentAmount = data1.data[0];
                    temp.commentActive = data1.data[2][0];
                    temp.commentBeforeArrow = data1.data[2][1];
                    temp.commentAfterArrow = data1.data[2][2];
                    $("#systemMessage").tmpl(temp).appendTo("#list-group-comment");
                }
            }
        })
}
//----私信--------------------------------------------------------------------------------------
function personalCenter_message() {
    document.getElementById('personal-center-comment').className=" ";
    document.getElementById('personal-center-message').className="active";
    document.getElementById('personal-center-system-message').className=" ";
    document.getElementById('list-group-comment').style.display = "none";
    document.getElementById('list-group-message').style.display = "";
    document.getElementById('list-group-system-message').style.display = "none";
}


//---滑到底部加载--------------------------------------------------------------------------------
