package com.seu.mstc.service.impl;

import com.seu.mstc.dao.QuestionDao;
import com.seu.mstc.dao.UserDao;
import com.seu.mstc.model.HostHolder;
import com.seu.mstc.model.Question;
import com.seu.mstc.pojo.ReturnPojo;
import com.seu.mstc.result.ResultInfo;
import com.seu.mstc.service.QuestionService;
import com.seu.mstc.utils.QuestionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by lk on 2018/5/3.
 */
@Service
public class QuestionServiceImpl implements QuestionService{
    @Autowired
    QuestionDao questionDao;

    @Autowired
    HostHolder hostHolder;

    @Autowired
    UserDao userDao;

    @Override
    public ResultInfo addQuestion(Question question) {
        ResultInfo result = null;
        question.setCreateTime(new Date());
        question.setStatus(0);                                 //添加时技术贴默认可见
        question.setLikeCount(0);
        question.setDislikeCount(0);                           //添加时赞踩都为0
        question.setIsTop(0);                                  //添加时默认不置顶
        if(hostHolder.getUser()==null){
            question.setUserId(QuestionUtils.ANONYMOUS_USERID);
        }else{
            question.setUserId(hostHolder.getUser().getId());
        }
        //此处做敏感词过滤



        if(questionDao.addQuestion(question)>0)
        {
            result=ResultInfo.ok();
        }                                                         //若添加成功则返回状态200
        return result;
    }

    @Override
    public ResultInfo getLatestQuestion(int offset,int limit) {
        ResultInfo result = null;
        List<Question> latestQuestion = new ArrayList<>();
        latestQuestion = questionDao.selectAllQuestion();
        //此处如何给前端返回一个数组

        List<Map<String,Object>> latestQustionAdded = new ArrayList<>();               //返回前端时可额外加字段，这里加了问题发布者的昵称
        for(Question question : latestQuestion){
            ReturnPojo returnPojo = new ReturnPojo(question);
            returnPojo.getResultMap().put("nickname",userDao.selectById(question.getUserId()).getNickname());

            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateString = formatter.format(question.getCreateTime());
            ParsePosition pos = new ParsePosition(8);
            Date currentTime_2 = formatter.parse(dateString, pos);
            returnPojo.getResultMap().put("createTime",currentTime_2);

            latestQustionAdded.add(returnPojo.getResultMap());
        }

        result = ResultInfo.ok(latestQustionAdded);
        return result;
    }
}
