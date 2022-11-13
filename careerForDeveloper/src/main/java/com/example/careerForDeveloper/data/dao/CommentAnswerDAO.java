package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import com.example.careerForDeveloper.data.entity.Post;

import java.util.List;

public interface CommentAnswerDAO {
    List<CommentAnswer> selectAllCommentAnswerByComment(Comment comment);
}
