package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.CommentDAO;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class CommentDAOImpl implements CommentDAO {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentDAOImpl(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    public long countCommentByPost(Post post){
        return commentRepository.countByPost(post);
    }
}
