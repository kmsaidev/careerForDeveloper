package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.Post;

import java.util.List;

public interface CommentDAO {
    Comment createComment(Comment comment);

    void updateComment(Comment comment);
    long countCommentByPost(Post post);
    List<Comment> selectAllCommentByPost(Post post);

    Comment selectCommentById(long commentId) throws BaseException;
}
