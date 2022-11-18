package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.CommentAnswerDAO;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import com.example.careerForDeveloper.data.repository.CommentAnswerRepository;
import com.example.careerForDeveloper.data.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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
    public void updateCommentAnswer(CommentAnswer commentAnswer){
        commentAnswerRepository.save(commentAnswer);
    }
    @Override
    public List<CommentAnswer> selectAllCommentAnswerByComment(Comment comment){
        return commentAnswerRepository.getAllByComment(comment);
    }

    @Override
    public CommentAnswer selectCommentAnswerById(long commentAnswerId) throws BaseException{
        Optional<CommentAnswer> selectedCommentAnswer = commentAnswerRepository.findById(commentAnswerId);

        if(selectedCommentAnswer.isPresent()) {
            CommentAnswer commentAnswer = selectedCommentAnswer.get();
            return commentAnswer;
        } else {
            throw new BaseException(BaseResponseStatus.COMMENT_ANSWER_FAILED_GET_COMMENT_ANSWER_INFO);
        }
    }
}
