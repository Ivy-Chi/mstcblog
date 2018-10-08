package com.seu.mstc.service;

import com.seu.mstc.model.Question;
import com.seu.mstc.result.ResultInfo;

/**
 * Created by lk on 2018/5/3.
 */
public interface QuestionService {

    public ResultInfo addQuestion(Question question);//发布技术讨论帖
    public ResultInfo getLatestQuestion(int offset,int limit);//获取最近状态正常的技术讨论帖信息


}
