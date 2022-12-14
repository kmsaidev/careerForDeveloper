package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    long countByPost(Post post);
    List<Comment> getAllByPost(Post post);
}
