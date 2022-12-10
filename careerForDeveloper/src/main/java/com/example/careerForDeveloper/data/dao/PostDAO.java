package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.User;

import java.util.List;

public interface PostDAO {
    Post createPost(Post post);
    void updatePost(Post post);
    void deletePost(Post post);
    List<Post> selectAllPost();
    Post selectPostById(long postId) throws BaseException;
    List<Post> selectPostsByUser(User user);
}
