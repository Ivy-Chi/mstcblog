package com.seu.mstc.controller;

import com.alibaba.fastjson.JSONObject;
import com.seu.mstc.dao.UserDao;
import com.seu.mstc.model.HostHolder;
import com.seu.mstc.model.User;
import com.seu.mstc.result.ResultInfo;
import com.seu.mstc.service.MessageService;
import com.seu.mstc.service.UserService;
import com.seu.mstc.utils.EmailUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by lk on 2018/5/3.
 */
@RestController
@RequestMapping(value="/message")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private EmailUtils emailUtils;

    @Autowired
    UserService userService;

    @Autowired
    UserDao userDao;

    @Autowired
    HostHolder hostHolder;

    @Autowired
    MessageService messageService;


    /**
     * 获取系统通知消息入口
     * @param jsonObject
     * @return
     */
    @RequestMapping(value="/getsystem",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo getSystemMessage(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        //添加业务逻辑和权限判断，调用service层
        return result;
    }


    /**
     * 获取个人收到消息入口
     * @param jsonObject
     * @return
     */
    @RequestMapping(value="/getuser",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo getUserActivity(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        //添加业务逻辑和权限判断，调用service层
        return result;
    }

    /**
     * 获取用户评论信息
     */
    @RequestMapping(value="/personalCenter/getUserComment",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo getUserComment(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        User user=hostHolder.getUser();
        int commentPage = jsonObject.getInteger("commentPage");
        result = messageService.selectSystemMessages(user.getId(),commentPage-1,12);
        return result;
    }
    /**
     * 用户已读评论
     */
    @RequestMapping(value="/personalCenter/readComment",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo setCommentRead(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        //User user=hostHolder.getUser();
        int commentId = jsonObject.getInteger("commentId");
        result = messageService.setMessagesRead(commentId);
        return result;
    }
    /**
     * 获取用户私信信息
     */
    @RequestMapping(value="/personalCenter/getUserMessage",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo getUserMessage(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        User user=hostHolder.getUser();



        return result;
    }

}
