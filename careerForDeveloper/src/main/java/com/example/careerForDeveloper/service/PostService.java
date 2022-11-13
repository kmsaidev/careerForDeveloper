package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.PostDto;
import com.example.careerForDeveloper.data.dto.AllPostResponseDto;
import com.example.careerForDeveloper.data.dto.PostResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    long savePost(PostDto postDto, MultipartFile attachedFile) throws BaseException;
    List<AllPostResponseDto> getAllPosts() throws BaseException;

    PostResponseDto getPost(long postId, long userId) throws BaseException;
}
