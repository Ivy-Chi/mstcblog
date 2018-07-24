package com.seu.mstc.model;

import java.util.Date;

/**
 * Created by lk on 2018/5/3.
 */
public class Blog {
    private int id;//博文id
    private int userId;//博文发布人的id
    private String title;//博文标题
    private String blogAbstract;//博文摘要
    private String content;//博文内容
    private String imageUrl;//博文图片
    private Date createTime;//博文发布时间
    private String keyWord;//博文关键词
    private int status;//博文的状态标志，是否可见，或者用来表示是否删除的状态(0代表可见，1代表被删除不可见)
    private int flag;//博文类型标志，比如1代表JAVA开发，2代表C++，3代表机器学习等等
    private int likeCount;//博文点赞人数
    private int dislikeCount;//博文点踩人数
    private int isTop;//博文是否置顶的标志（0代表不置顶，1代表置顶）

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBlogAbstract() {
        return blogAbstract;
    }

    public void setBlogAbstract(String blogAbstract) {
        this.blogAbstract = blogAbstract;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getDislikeCount() {
        return dislikeCount;
    }

    public void setDislikeCount(int dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public int getIsTop() {
        return isTop;
    }

    public void setIsTop(int isTop) {
        this.isTop = isTop;
    }
}
