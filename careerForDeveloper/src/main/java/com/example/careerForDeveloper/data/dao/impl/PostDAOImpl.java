package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.PostDAO;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.PostRepository;
import com.example.careerForDeveloper.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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
    @Override
    public void updatePost(Post post){
        postRepository.save(post);
    }

    @Override
    public List<Post> selectAllPost(){
        return postRepository.findAll();
    }

    @Override
    public Post selectPostById(long postId) throws BaseException{
        Optional<Post> selectedPost = postRepository.findById(postId);

        if(selectedPost.isPresent()) {
            Post post = selectedPost.get();
            return post;
        } else {
            throw new BaseException(BaseResponseStatus.POSTS_EMPTY_POST_ID);
        }
    }
}
