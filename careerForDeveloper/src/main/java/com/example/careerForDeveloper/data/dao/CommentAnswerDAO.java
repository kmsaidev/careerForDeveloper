package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import com.example.careerForDeveloper.data.entity.Post;

import java.util.List;

public interface CommentAnswerDAO {
    CommentAnswer createCommentAnswer(CommentAnswer commentAnswer);
    void updateCommentAnswer(CommentAnswer commentAnswer);
    List<CommentAnswer> selectAllCommentAnswerByComment(Comment comment);
    CommentAnswer selectCommentAnswerById(long commentAnswerId) throws BaseException;
}
