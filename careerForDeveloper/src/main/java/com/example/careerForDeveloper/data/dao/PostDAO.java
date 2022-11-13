package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.Post;

import java.util.List;

public interface PostDAO {
    Post createPost(Post post);
    List<Post> selectAllPost();

    Post selectPost(long postId) throws BaseException;
}
