package com.seu.mstc.controller;

import com.alibaba.fastjson.JSONObject;
import com.seu.mstc.dao.UserDao;
import com.seu.mstc.model.HostHolder;
import com.seu.mstc.model.Question;
import com.seu.mstc.result.ResultInfo;
import com.seu.mstc.service.QuestionService;
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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by lk on 2018/5/3.
 */
@RestController
@RequestMapping(value="/question")
public class QuestionController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private EmailUtils emailUtils;

    @Autowired
    UserService userService;

    @Autowired
    QuestionService questionService;

    @Autowired
    UserDao userDao;

    @Autowired
    HostHolder hostHolder;


    /**
     * 加载技术帖子入口
     * @param jsonObject
     * @return
     */
    @RequestMapping(value="/onLoad",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo onLoadQuestion(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        //拉取数据库中最新的100条,有待改善
        int offset = 0;
        int limit = 100;
        result = questionService.getLatestQuestion(offset,limit);
        return result;
    }


    /**
     * 发布技术帖子入口
     * @param jsonObject
     * @return
     */
    @RequestMapping(value="/public",method = RequestMethod.POST,
    produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo publicQuestion(@RequestBody JSONObject jsonObject){
        ResultInfo result = null;
        Question question = new Question();
        String title = jsonObject.getString("title");
        String content = jsonObject.getString("content");
//        String imageUrl = jsonObject.getString("imageUrl");
        String imageUrl = null;//暂时无图片

        String keyWord = jsonObject.getString("title");
//        String flag = jsonObject.getString("flag");
        //此处有待修改,如何判别帖子类型
        String flag ="1";

        int flagInt = Integer.parseInt(flag);
        question.setTitle(title);
        question.setContent(content);
        question.setImageUrl(hostHolder.getUser().getHeadUrl());
        question.setKeyWord(keyWord);
        question.setFlag(flagInt);
        result = questionService.addQuestion(question);
        return result;
    }


    /**
     * 评论技术贴入口
     * @param jsonObject
     * @return
     */
    @RequestMapping(value="/comment",method = RequestMethod.POST,
            produces= MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResultInfo commentQuestion(@RequestBody JSONObject jsonObject){
        ResultInfo result=null;
        //添加业务逻辑和权限判断，调用service层
        return result;
    }

}
