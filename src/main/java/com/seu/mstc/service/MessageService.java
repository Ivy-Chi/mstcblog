package com.seu.mstc.service;

import com.seu.mstc.result.ResultInfo;

import java.util.List;

/**
 * Created by lk on 2018/5/3.
 */
public interface MessageService {

    public ResultInfo addMessage(int userId);//
    public ResultInfo selectSystemMessages(int userId, int limit, int offset); //根据to_id取出所有动态
    public List systemMessagesAmount(int userId, int limit ); //当前应显示的页
    public ResultInfo setMessagesRead(int messageId);   //将对应message设为已读

}
