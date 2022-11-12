package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.PostDAO;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.PostRepository;
import com.example.careerForDeveloper.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostDAOImpl implements PostDAO {
    private final PostRepository postRepository;

    @Autowired
    public PostDAOImpl(PostRepository postRepository){
        this.postRepository = postRepository;
    }

    @Override
    public Post createPost(Post post){
        Post savedPost = postRepository.save(post);

        return savedPost;
    }
}
