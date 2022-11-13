package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.CommentDAO;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;


@Component
public class CommentDAOImpl implements CommentDAO {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentDAOImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment createComment(Comment comment){
        Comment savedComment = commentRepository.save(comment);

        return savedComment;
    }
    @Override
    public long countCommentByPost(Post post){
        return commentRepository.countByPost(post);
    }

    @Override
    public List<Comment> selectAllCommentByPost(Post post){
        return commentRepository.getAllByPost(post);
    }
}
