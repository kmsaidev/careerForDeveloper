package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import com.example.careerForDeveloper.data.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentAnswerRepository extends JpaRepository<CommentAnswer, Long> {
    List<CommentAnswer> getAllByComment(Comment comment);
}
