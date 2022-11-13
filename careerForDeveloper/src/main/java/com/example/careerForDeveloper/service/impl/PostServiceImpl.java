package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.CommentAnswerDAO;
import com.example.careerForDeveloper.data.dao.CommentDAO;
import com.example.careerForDeveloper.data.dao.PostDAO;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.*;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.service.PostService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    private final PostDAO postDAO;
    private final UserDAO userDAO;
    private final CommentDAO commentDAO;
    private final CommentAnswerDAO commentAnswerDAO;
    private final JwtService jwtService;

    @Autowired
    public PostServiceImpl(PostDAO postDAO, UserDAO userDAO, CommentDAO commentDAO, CommentAnswerDAO commentAnswerDAO,
                           JwtService jwtService){
        this.postDAO = postDAO;
        this.userDAO = userDAO;
        this.commentDAO = commentDAO;
        this.commentAnswerDAO = commentAnswerDAO;
        this.jwtService = jwtService;
    }


    public long savePost(PostDto postDto, MultipartFile attachedFile) throws BaseException {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContents(postDto.getContents());
        post.setUser(userDAO.selectUserById(postDto.getUserId()));
        String fileName = attachedFile.getOriginalFilename();
        String path = "C:/spring/attachedFiles/";
        Path filePath = Paths.get(path + fileName);
        if(!attachedFile.isEmpty()){
            try{
                Files.write(filePath, attachedFile.getBytes());
            } catch (Exception e){
                throw new BaseException(BaseResponseStatus.POST_FAILED_STORE_ATTACHED_FILE);
            }
            post.setFileLoc(path + fileName);
        }
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        post.setStatus("ACTIVE");

        Post savedPost = postDAO.createPost(post);
        return savedPost.getPostId();
    }

    public List<AllPostResponseDto> getAllPosts() throws BaseException{
        List<AllPostResponseDto> result = new ArrayList<>();
        List<Post> postList = postDAO.selectAllPost();

        for(int i = 0; i < postList.size(); i++){
            AllPostResponseDto postDto = new AllPostResponseDto();
            Post post = postList.get(i);
            postDto.setPostId(post.getPostId());
            postDto.setTitle(post.getTitle());
            postDto.setContents(post.getContents());
            postDto.setNickname(post.getUser().getNickname());
            long commentCount = commentDAO.countCommentByPost(post);
            postDto.setCommentCount(commentCount);
            result.add(postDto);
        }
        return result;
    }

    public PostResponseDto getPost(long postId, long userId) throws BaseException{
        Post post = postDAO.selectPost(postId);
        List<Comment> commentList = commentDAO.selectAllCommentByPost(post);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        PostResponseDto result = new PostResponseDto();

        result.setPostId(post.getPostId());
        result.setTitle(post.getTitle());
        result.setContents(post.getContents());
        result.setUserId(post.getUser().getUserId());
        result.setNickname(post.getUser().getNickname());
        result.setCreatedAt(post.getCreatedAt());
        result.setProfileImageLoc(post.getUser().getProfileImageLoc());
        long commentCount = 0;
        for(Comment comment : commentList){
            List<CommentAnswer> list = commentAnswerDAO.selectAllCommentAnswerByComment(comment);
            List<CommentAnswerDto> commentAnswerList = new ArrayList<>();
            for(CommentAnswer commentAnswer : list){
                CommentAnswerDto commentAnswerDto = new CommentAnswerDto();
                commentAnswerDto.setContents(commentAnswer.getContents());
                commentAnswerDto.setNickname(commentAnswer.getUser().getNickname());
                commentAnswerDto.setProfileImageLoc(commentAnswer.getUser().getProfileImageLoc());
                commentAnswerDto.setMyCommentAnswer(commentAnswer.getUser().getUserId() == userId);
                commentAnswerList.add(commentAnswerDto);
            }
            String contents = comment.getContents();
            String nickname = comment.getUser().getNickname();
            String profileImageLoc = comment.getUser().getProfileImageLoc();
            boolean isMyComment = comment.getUser().getUserId() == userId;
            commentResponseDtoList.add(new CommentResponseDto(profileImageLoc, nickname, contents,
                    isMyComment, commentAnswerList));
            commentCount++;
        }
        result.setCommentList(commentResponseDtoList);
        result.setCommentCount(commentCount);
        return result;
    }
}
