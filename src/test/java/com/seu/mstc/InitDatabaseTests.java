package com.seu.mstc;

import com.seu.mstc.dao.QuestionDao;
import com.seu.mstc.model.Question;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.Random;

@RunWith(SpringRunner.class)
@SpringBootTest
@Sql("/seumstc.sql")
public class InitDatabaseTests {
    @Autowired
    QuestionDao questionDao;

    @Test
    public void contextLoads(){
        Random random = new Random();
        Date date = new Date();
        for (int i = 0; i < 11; ++i){
            Question question = new Question();
            question.setContent(String.format("Balaababalalalal Content %d", i));
            question.setCreateTime(date);
            question.setDislikeCount(i);
            question.setFlag(i);
            question.setImageUrl(String.format("http://images.nowcoder.com/head/%dt.png", random.nextInt(1000)));
            question.setIsTop(0);
            question.setKeyWord("yyy"+i);
            question.setLikeCount(i);
            question.setStatus(0);
            question.setTitle("title"+i);
            question.setUserId(i);
            questionDao.addQuestion(question);
        }
    }
}
