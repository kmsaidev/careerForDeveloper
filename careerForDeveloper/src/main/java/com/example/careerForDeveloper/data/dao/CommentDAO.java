package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.Post;

public interface CommentDAO {
    long countCommentByPost(Post post);
}
