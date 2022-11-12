package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.PostDto;
import com.example.careerForDeveloper.data.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

public interface PostService {
    long savePost(PostDto postDto, MultipartFile attachedFile) throws BaseException;
}
