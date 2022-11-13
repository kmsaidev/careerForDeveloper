package com.example.careerForDeveloper.controller;
import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.PostDto;
import com.example.careerForDeveloper.data.dto.AllPostResponseDto;
import com.example.careerForDeveloper.data.dto.PostResponseDto;
import com.example.careerForDeveloper.service.PostService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;
    private final JwtService jwtService;

    @Autowired
    public PostController(PostService postService, JwtService jwtService){
        this.postService = postService;
        this.jwtService = jwtService;
    }

    @PostMapping("")
    public BaseResponse<Long> createPost(@RequestPart PostDto postDto,
                                                    @RequestPart MultipartFile attachedFile){
        try{
            long userIdByJwt = jwtService.getUserId();

            postDto.setUserId(userIdByJwt);
            long postId = postService.savePost(postDto, attachedFile);
            return new BaseResponse<>(postId);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @GetMapping("")
    public BaseResponse<List<AllPostResponseDto>> getAllPosts() throws BaseException{
        try {
            List<AllPostResponseDto> postList = postService.getAllPosts();
            return new BaseResponse<>(postList);
        } catch(BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @GetMapping("/post")
    public BaseResponse<PostResponseDto> getPost(@RequestParam long postId) throws BaseException{
        try{
            long userIdByJwt = jwtService.getUserId();
            PostResponseDto postResponseDto = postService.getPost(postId, userIdByJwt);

            postResponseDto.setMyPost(postResponseDto.getUserId() == userIdByJwt);
            return new BaseResponse<>(postResponseDto);
        } catch(BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
