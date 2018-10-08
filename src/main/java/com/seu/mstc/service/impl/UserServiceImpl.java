package com.seu.mstc.service.impl;

import com.seu.mstc.dao.UserDao;
import com.seu.mstc.jedis.JedisClient;
import com.seu.mstc.model.HostHolder;
import com.seu.mstc.model.User;
import com.seu.mstc.pojo.ReturnPojo;
import com.seu.mstc.result.ResultInfo;
import com.seu.mstc.service.UserService;
import com.seu.mstc.utils.JsonUtils;
import com.seu.mstc.utils.Md5Util;
import com.seu.mstc.utils.UpLoadHeadImgUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * Created by hys on 2018/4/30.
 */
@Service
public class UserServiceImpl implements UserService {


    //session 的过期时间
    @Value("${SESSION_EXPIRE}")
    private Integer SESSION_EXPIRE;

    @Autowired
    UserDao userDao;

    @Autowired
    private JedisClient jedisClient;

    @Autowired
    HostHolder hostHolder;


    //邮箱重复性检查
    @Override
    public ResultInfo checkData(String email) {
        User user=null;
        user=userDao.selectByEmail(email);
        if(user==null){
            return ResultInfo.ok(false);
        }
        return ResultInfo.ok(true);
    }

    //用户注册
    @Override
    public ResultInfo register(String email, String password,String token) {
        if(StringUtils.isBlank(email)|| StringUtils.isBlank(password))
            return ResultInfo.build(400, "用户数据不完整，注册失败");

        User user=userDao.selectByEmail(email);
        if(user!=null){
            return ResultInfo.build(400,"此邮箱已经被注册");
        }

        Date date=new Date();
        user=new User();
        user.setNickname(email);
        user.setHometown("江苏省 南京市");
        user.setSalt(UUID.randomUUID().toString().substring(0, 5));//随机生成一段盐存入数据库
        user.setEmail(email);
        user.setPassword(Md5Util.MD5(password + user.getSalt()));//存入密码加盐后的加密密文
        user.setRegisterTime(date);
        user.setToken(token);
        user.setHeadUrl("images/niming.jpg");
        userDao.addUser(user);

        return ResultInfo.ok(user.getId());
    }



    //登录
    @Override
    public ResultInfo login(String email, String password) {
        User user=null;
        user=userDao.selectByEmail(email);

        if(user==null){
            return ResultInfo.build(400,"用户名或密码错误！！");
        }
        if(!Md5Util.MD5(password+user.getSalt()).equals(user.getPassword())){
            String str = Md5Util.MD5(password+user.getSalt());
            return ResultInfo.build(400,"用户名或密码错误！");
        }

        return ResultInfo.ok();
    }

    @Override
    public ResultInfo getUserId(){
        int userId = -1;
        if(hostHolder.getUser()!=null){
            userId = hostHolder.getUser().getId();
        }
        return ResultInfo.ok(userId);
    }

    @Override
    public ResultInfo getUser(){
        User user = null;
        if(hostHolder.getUser()!=null){
            user = hostHolder.getUser();
            ReturnPojo returnPojo = new ReturnPojo(user);

            if (user.getBirthday()!=null) {
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                String dateString = formatter.format(user.getBirthday());
                returnPojo.getResultMap().put("birthdayString", dateString);
            }
            else{
                returnPojo.getResultMap().put("birthdayString", "1995-03-11");
            }
            return ResultInfo.ok(returnPojo.getResultMap());
        }
        return ResultInfo.ok(null);
    }

    @Override
    public ResultInfo getUserPhoto(String username, int type) {
        return null;
    }

    @Override
    public ResultInfo updateUserInfo(User user, String token) {
        if(userDao.updateUserInfoByToken(user)>0){
            return ResultInfo.ok();
        }
        return null;
    }

    //根据Token获取个人信息
    @Override
    public ResultInfo getUserByToken(String token) {
        return null;
    }

    @Override
    public ResultInfo getUserSettingByUserId(Integer userId) {
        return null;
    }

    //退出登录
    @Override
    public ResultInfo sinOut(String token) {
        return null;
    }

    //更新密码
    @Override
    public ResultInfo updatePasswordById(Integer id, String password) { return null; }


    //检查密码的正确性
    @Override
    public ResultInfo checkPasswordById(Integer id, String password) {
        return null;
    }

    //更新邮箱
    @Override
    public ResultInfo updateEmail(Integer id, String password, String token) {
        return null;
    }

    @Override
    public ResultInfo updateBackgroundUrlById(User user, String token) {
        return null;
    }

    //更新头像
    @Override
    public ResultInfo updateHeadUrlById(User user,String headUrl) {
        user.setHeadUrl(headUrl);
        if (userDao.updateHeadUrl(user)==1)
            return new ResultInfo().ok();
        return null;
    }

    @Override
    public ResultInfo getUserInfoByUserId(Integer userId) {
        return null;
    }

    @Override
    public ResultInfo retrievePassword(String email, String password){
        if(StringUtils.isBlank(email)|| StringUtils.isBlank(password))
            return ResultInfo.build(400, "用户数据不完整，更改密码失败");

        User user=userDao.selectByEmail(email);
        if(user==null){
            return ResultInfo.build(400,"此邮箱未注册");
        }
        user.setSalt(UUID.randomUUID().toString().substring(0, 5));//随机生成一段盐存入数据库
        user.setPassword(Md5Util.MD5(password + user.getSalt()));//存入密码加盐后的加密密文
        userDao.updatePassword(user);
        return ResultInfo.ok(user.getId());
    }

    //存储用户头像
    @Override
    public String saveImage(MultipartFile file) throws IOException{
        int dotPos = file.getOriginalFilename().lastIndexOf(".");
        if (dotPos < 0) {
            return null;
        }
        String fileExt = file.getOriginalFilename().substring(dotPos + 1).toLowerCase();
        if (!UpLoadHeadImgUtils.isFileAllowed(fileExt)) {
            return null;
        }

        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + "." + fileExt;
        Files.copy(file.getInputStream(), new File(UpLoadHeadImgUtils.IMAGE_DIR + fileName).toPath(),
                StandardCopyOption.REPLACE_EXISTING);
        return UpLoadHeadImgUtils.MSTCBLOG_DOMAIN  + fileName;
    }

}
