package com.seu.mstc.dao;

import com.seu.mstc.model.Question;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by lk on 2018/5/3.
 */
@Component
@Mapper
public interface QuestionDao {
    String TABLE_NAME=" question ";
    String INSERT_FIELDS="  user_id, title, content, image_url, create_time, key_word, status," +
            " flag, like_count, dislike_count, is_top  ";
    String SELECT_FIELDS=" id, " + INSERT_FIELDS;


    @Insert({"insert into ",TABLE_NAME, "(", INSERT_FIELDS,
            ") values(#{userId},#{title},#{content},#{imageUrl},#{createTime},#{keyWord}," +
                    "#{status},#{flag},#{likeCount},#{dislikeCount},#{isTop})"})
    int addQuestion(Question question);

    @Select({"select ", SELECT_FIELDS, " from ", TABLE_NAME, " where id=#{id}"})
    Question selectQuestionById(int id);

    @Select({"select * from ",TABLE_NAME, " limit #{offset} #{limit}"})
    List<Question> selectLatestQuestion(@Param("offset")int offset,
                                        @Param("limit") int limit);

    @Select({"select * from ",TABLE_NAME})
    List<Question> selectAllQuestion();

    @Update({"update ",TABLE_NAME, " set is_top=#{isTop} where id=#{id}"})
    void updateIsTop(Question question);




}
