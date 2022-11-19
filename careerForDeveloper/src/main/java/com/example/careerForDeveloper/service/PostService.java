package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.*;
import org.hibernate.sql.Update;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {
    long savePost(PostDto postDto, MultipartFile attachedFile) throws BaseException;
    long updatePost(UpdatePostDto updatePostDto, MultipartFile attachedFile) throws BaseException;

    void deletePost(DeletePostDto deletePostDto) throws BaseException;
    List<AllPostResponseDto> getAllPosts() throws BaseException;

    PostResponseDto getPost(long postId, long userId) throws BaseException;

    long saveComment(CommentDto commentDto) throws BaseException;
    long updateComment(UpdateCommentDto updateCommentDto) throws BaseException;
    void deleteComment(DeleteCommentDto deleteCommentDto) throws BaseException;
    long saveCommentAnswer(CommentAnswerDto commentAnswerDto) throws BaseException;
    long updateCommentAnswer(UpdateCommentAnswerDto updateCommentAnswerDto) throws BaseException;
    void deleteCommentAnswer(DeleteCommentAnswerDto deleteCommentAnswerDto) throws BaseException;
}
