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
import java.util.UUID;

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


    @Override
    public long savePost(PostDto postDto, MultipartFile attachedFile) throws BaseException {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContents(postDto.getContents());
        post.setUser(userDAO.selectUserById(postDto.getUserId()));
        UUID uuid = UUID.randomUUID();
        String fileName = attachedFile != null ? uuid.toString() + attachedFile.getOriginalFilename() : "null";
        String path = "/Users/gyeonghyun/upload/";
        Path filePath = Paths.get(path + fileName);

        if(attachedFile != null && !attachedFile.isEmpty()){
            try{
                Files.write(filePath, attachedFile.getBytes());
            } catch (Exception e){
                throw new BaseException(BaseResponseStatus.POST_FAILED_STORE_ATTACHED_FILE);
            }
            post.setFileLoc(fileName);
        }
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        Post savedPost = postDAO.createPost(post);
        return savedPost.getPostId();
    }

    @Override
    public long updatePost(UpdatePostDto updatePostDto, MultipartFile attachedFile) throws BaseException{
        Post post = postDAO.selectPostById(updatePostDto.getPostId());
        if(updatePostDto.getUserId() != post.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        post.setTitle(updatePostDto.getTitle());
        post.setContents(updatePostDto.getContents());
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString() + attachedFile.getOriginalFilename();
        String path = "/Users/gyeonghyun/upload/";
        Path filePath = Paths.get(path + fileName);
        if(!attachedFile.isEmpty()){
            try{
                Files.write(filePath, attachedFile.getBytes());
            } catch (Exception e){
                throw new BaseException(BaseResponseStatus.POST_FAILED_STORE_ATTACHED_FILE);
            }
            post.setFileLoc(fileName);
        } else{
            post.setFileLoc(null);
        }
        postDAO.updatePost(post);
        return post.getPostId();
    }

    @Override
    public void deletePost(DeletePostDto deletePostDto) throws BaseException{
        Post post = postDAO.selectPostById(deletePostDto.getPostId());
        List<Comment> commentList = commentDAO.selectAllCommentByPost(post);
        if(deletePostDto.getUserId() != post.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        for(Comment comment : commentList){
            List<CommentAnswer> commentAnswerList = commentAnswerDAO.selectAllCommentAnswerByComment(comment);
            for(CommentAnswer commentAnswer : commentAnswerList)
                commentAnswerDAO.deleteCommentAnswer(commentAnswer);
            commentDAO.deleteComment(comment);
        }
        postDAO.deletePost(post);
    }

    @Override
    public List<AllPostResponseDto> getAllPosts() throws BaseException{
        List<AllPostResponseDto> result = new ArrayList<>();
        List<Post> postList = postDAO.selectAllPost();

        for(int i = 0; i < postList.size(); i++){
            AllPostResponseDto postDto = new AllPostResponseDto();
            Post post = postList.get(i);
            postDto.setId(post.getPostId());
            postDto.setTitle(post.getTitle());
            postDto.setContents(post.getContents());
            postDto.setNickname(post.getUser().getNickname());
            long commentCount = commentDAO.countCommentByPost(post);
            postDto.setCommentCount(commentCount);
            result.add(postDto);
        }
        return result;
    }

    @Override
    public PostResponseDto getPost(long postId, long userId) throws BaseException{
        Post post = postDAO.selectPostById(postId);
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
        result.setFileLoc(post.getFileLoc());
        long commentCount = 0;
        for(Comment comment : commentList){
            List<CommentAnswer> list = commentAnswerDAO.selectAllCommentAnswerByComment(comment);
            List<CommentAnswerResponseDto> commentAnswerList = new ArrayList<>();
            for(CommentAnswer commentAnswer : list){
                CommentAnswerResponseDto commentAnswerResponseDto = new CommentAnswerResponseDto();
                commentAnswerResponseDto.setCommentAnswerId(commentAnswer.getCommentAnswerId());
                commentAnswerResponseDto.setContents(commentAnswer.getContents());
                commentAnswerResponseDto.setNickname(commentAnswer.getUser().getNickname());
                commentAnswerResponseDto.setProfileImageLoc(commentAnswer.getUser().getProfileImageLoc());
                commentAnswerResponseDto.setMyCommentAnswer(commentAnswer.getUser().getUserId() == userId);
                commentAnswerList.add(commentAnswerResponseDto);
            }
            long commentId = comment.getCommentId();
            String contents = comment.getContents();
            String nickname = comment.getUser().getNickname();
            String profileImageLoc = comment.getUser().getProfileImageLoc();
            boolean isMyComment = comment.getUser().getUserId() == userId;
            commentResponseDtoList.add(new CommentResponseDto(commentId, profileImageLoc, nickname, contents,
                    isMyComment, commentAnswerList));
            commentCount++;
        }
        result.setCommentList(commentResponseDtoList);
        result.setCommentCount(commentCount);
        return result;
    }

    @Override
    public long saveComment(CommentDto commentDto) throws BaseException{
        Comment comment = new Comment();
        comment.setContents(commentDto.getContents());
        comment.setUser(userDAO.selectUserById(commentDto.getUserId()));
        comment.setPost(postDAO.selectPostById(commentDto.getPostId()));
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        Comment savedComment = commentDAO.createComment(comment);
        return savedComment.getCommentId();
    }

    @Override
    public long updateComment(UpdateCommentDto updateCommentDto) throws BaseException{
        Comment comment = commentDAO.selectCommentById(updateCommentDto.getCommentId());
        if(updateCommentDto.getUserId() != comment.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        comment.setContents(updateCommentDto.getContents());
        commentDAO.updateComment(comment);
        return comment.getCommentId();
    }

    @Override
    public void deleteComment(DeleteCommentDto deleteCommentDto) throws BaseException{
        Comment comment = commentDAO.selectCommentById(deleteCommentDto.getCommentId());
        if(deleteCommentDto.getUserId() != comment.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        List<CommentAnswer> commentAnswerList = commentAnswerDAO.selectAllCommentAnswerByComment(comment);
        for(CommentAnswer commentAnswer : commentAnswerList)
            commentAnswerDAO.deleteCommentAnswer(commentAnswer);
        commentDAO.deleteComment(comment);
    }

    @Override
    public long saveCommentAnswer(CommentAnswerDto commentAnswerDto) throws BaseException{
        CommentAnswer commentAnswer = new CommentAnswer();
        commentAnswer.setContents(commentAnswerDto.getContents());
        commentAnswer.setUser(userDAO.selectUserById(commentAnswerDto.getUserId()));
        commentAnswer.setComment(commentDAO.selectCommentById(commentAnswerDto.getCommentId()));
        commentAnswer.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        CommentAnswer savedCommentAnswer = commentAnswerDAO.createCommentAnswer(commentAnswer);
        return savedCommentAnswer.getCommentAnswerId();
    }

    @Override
    public long updateCommentAnswer(UpdateCommentAnswerDto updateCommentAnswerDto) throws BaseException{
        CommentAnswer commentAnswer =
                commentAnswerDAO.selectCommentAnswerById(updateCommentAnswerDto.getCommentAnswerId());
        if(updateCommentAnswerDto.getUserId() != commentAnswer.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        commentAnswer.setContents(updateCommentAnswerDto.getContents());
        commentAnswerDAO.updateCommentAnswer(commentAnswer);
        return commentAnswer.getCommentAnswerId();
    }

    @Override
    public void deleteCommentAnswer(DeleteCommentAnswerDto deleteCommentAnswerDto) throws BaseException{
        CommentAnswer commentAnswer =
                commentAnswerDAO.selectCommentAnswerById(deleteCommentAnswerDto.getCommentAnswerId());
        if(deleteCommentAnswerDto.getUserId() != commentAnswer.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        commentAnswerDAO.deleteCommentAnswer(commentAnswer);
    }
}
