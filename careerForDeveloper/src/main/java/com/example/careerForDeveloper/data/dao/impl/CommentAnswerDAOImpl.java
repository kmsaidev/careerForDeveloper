package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.CommentAnswerDAO;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import com.example.careerForDeveloper.data.repository.CommentAnswerRepository;
import com.example.careerForDeveloper.data.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentAnswerDAOImpl implements CommentAnswerDAO {
    private final CommentAnswerRepository commentAnswerRepository;

    @Autowired
    public CommentAnswerDAOImpl(CommentAnswerRepository commentAnswerRepository){
        this.commentAnswerRepository = commentAnswerRepository;
    }

    @Override
    public CommentAnswer createCommentAnswer(CommentAnswer commentAnswer){
        return commentAnswerRepository.save(commentAnswer);
    }
    @Override
    public List<CommentAnswer> selectAllCommentAnswerByComment(Comment comment){
        return commentAnswerRepository.getAllByComment(comment);
    }
}
