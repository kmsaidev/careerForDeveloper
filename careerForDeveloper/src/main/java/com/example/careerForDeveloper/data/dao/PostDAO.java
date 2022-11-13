package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.User;

import java.util.List;

public interface PostDAO {
    Post createPost(Post post);
    List<Post> findAllPost();
}
