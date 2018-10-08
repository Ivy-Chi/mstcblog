package com.seu.mstc.controller;


import com.alibaba.fastjson.JSONObject;
import com.seu.mstc.dao.UserDao;
import com.seu.mstc.model.HostHolder;
import com.seu.mstc.model.User;
import com.seu.mstc.pojo.ReturnPojo;
import com.seu.mstc.result.ResultInfo;
import com.seu.mstc.service.UserService;
import com.seu.mstc.utils.EmailUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

/**
 * Created by lk on 2018/4/30.
 */

@RestController
@RequestMapping(value="/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private EmailUtils emailUtils;

    @Autowired
    UserService userService;

    @Autowired
    UserDao userDao;

    @Autowired
    HostHolder hostHolder;

    /**
     * 用户名和邮箱重复性检查
     * 数据库中已有该用户名或者邮箱则返回true，否则返会false
     * @param jsonObject
     * @return
     */
    @RequestMapping(value="/check",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo checkData(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        String email=jsonObject.getString("email");
        try {
            result = userService.checkData(email);
        } catch (Exception e) {
            logger.error("重复性检查出现异常"+e.getMessage());
            e.printStackTrace();
            result=ResultInfo.build(500, "检查时服务器发生错误！");
        }
        return result;
    }



    //邮箱注册
    @RequestMapping(value="/registeremail",method = RequestMethod.POST)
    public ResultInfo register(@RequestBody JSONObject jsonObject,HttpServletResponse response){
        String email=jsonObject.getString("email");
        String password=jsonObject.getString("password");

        //没有加是否需要记住登陆状态判断，直接给定一个有效期了
        String token= UUID.randomUUID().toString();
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/");
        cookie.setMaxAge(3600 * 24 * 5);//5天的有效期
        response.addCookie(cookie);

        return userService.register(email,password,token);
    }

    //注册时发送验证码
    /**
     * 发送验证码
     * @param jsonObject
     * @return
     */
    @RequestMapping(value = "/captcha",method = RequestMethod.POST)
    public ResultInfo sendCaptcha(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        String code=jsonObject.getString("code");
        String email=jsonObject.getString("email");
        try {
            result = emailUtils.sendCaptcha(code, email);
        } catch (Exception e) {
            logger.error("发送验证码时服务器发生异常"+e.getMessage());
            e.printStackTrace();
            result=ResultInfo.build(500, "发送验证码时服务器发生错误！");
        }
        return result;
    }

    //登录
    @RequestMapping(value="/login",method = RequestMethod.POST)
    public ResultInfo login(@RequestBody JSONObject jsonObject,HttpServletResponse response){
        ResultInfo result=null;
        String password=jsonObject.getString("password");
        String email=jsonObject.getString("email");
        Boolean rememberme=jsonObject.getBoolean("rememberme");
        User user=userDao.selectByEmail(email);
        result=userService.login(email,password);

        if(result.getStatus()==200){
            String token = UUID.randomUUID().toString();
            user.setToken(token);
            userDao.updateToken(user);
            Cookie cookie=new Cookie("token",token);
            cookie.setPath("/");
            if(rememberme){
                cookie.setMaxAge(3600*24*5);//有效期5天3600*24*5
            }
            response.addCookie(cookie);
        }

        return result;
    }

    //登出
    @RequestMapping(value="/logout",method = RequestMethod.POST)
    public ResultInfo logout (@RequestBody JSONObject jsonObject,HttpServletResponse response){
        ResultInfo resultInfo = null;
        String token = UUID.randomUUID().toString();
        User user = hostHolder.getUser();
        if(user!=null) {
            user.setToken(token);
            resultInfo = ResultInfo.ok();
        }
        return  resultInfo;
    }

    //给前端发送当前用户的id，若处于未登录状态则发送-1
    @RequestMapping(value="/getUserId",method = RequestMethod.POST)
    public ResultInfo getUserId(@RequestBody JSONObject jsonObject,HttpServletResponse response){
        ResultInfo result =null;
        int id = jsonObject.getInteger("id");
        if(id==1){
            result = userService.getUserId();
        }
        return result;
    }

    //获取当前用户
    @RequestMapping(value="/getUser",method = RequestMethod.POST)
    public ResultInfo getUser(@RequestBody JSONObject jsonObject,HttpServletResponse response){
        ResultInfo result =null;
        int id = jsonObject.getInteger("id");
        if(id==1){
            result = userService.getUser();
        }
        return result;
    }

    //邮箱修改密码
    @RequestMapping(value="/retrievePassword",method = RequestMethod.POST)
    public ResultInfo retrievePassword(@RequestBody JSONObject jsonObject,HttpServletResponse response){
        String email=jsonObject.getString("email");
        String password=jsonObject.getString("password");

        String token= UUID.randomUUID().toString();
        Cookie cookie = new Cookie("token", token);
        cookie.setPath("/");
        cookie.setMaxAge(3600 * 24 * 5);//5天的有效期
        response.addCookie(cookie);

        return userService.retrievePassword(email,password);
    }


    //个人中心，修改用户信息
    @RequestMapping(value="/personalCenter/editPersonalInformation",method = RequestMethod.POST)
    public ResultInfo editPersonalInformation(@RequestBody JSONObject jsonObject,
                                              HttpServletResponse response){
        User user=hostHolder.getUser();
        //nickname
        if(jsonObject.containsKey("nickname")) {
            String nickname = jsonObject.getString("nickname");
            if(!user.getNickname().equals(nickname))
                user.setNickname(nickname);
        }
        //sex
        if(jsonObject.containsKey("sex")) {
            String sex= jsonObject.getString("sex");
            int sex1;
            if(sex.equals("男"))
                sex1=1;
            else if (sex.equals("女"))
                sex1=2;
            else
                sex1=0;
            if(user.getSex()!=sex1)
                user.setSex(sex1);
        }
        //birthday
        if(jsonObject.containsKey("birthday")){
            String birthday= jsonObject.getString("birthday");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Date birthday1=sdf.parse(birthday);
                user.setBirthday(birthday1);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        //school
        if(jsonObject.containsKey("school")) {
            String school = jsonObject.getString("school");
            user.setSchool(school);
        }
        //hobby
        if(jsonObject.containsKey("hobby")) {
            String hobby = jsonObject.getString("hobby");
            user.setHobby(hobby);
        }

        String token=user.getToken();

        ResultInfo result =null;
        result=userService.updateUserInfo(user,token);      //更新数据库

        return result;
    }

    //个人中心，修改用户头像
    @RequestMapping(value="/personalCenter/editPersonalHead",method = RequestMethod.POST)
    public ResultInfo editPersonalHead( @RequestParam(value = "image", required = false) MultipartFile file){

        User user=hostHolder.getUser();
        ResultInfo result=null;
        try {
            String fileUrl = userService.saveImage(file);
            if (fileUrl == null) {
                return result;
            }
            result = userService.updateHeadUrlById(user, fileUrl);
            return result;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return result;
        }
    }


}

