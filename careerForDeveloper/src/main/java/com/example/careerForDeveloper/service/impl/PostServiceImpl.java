package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.PostDAO;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.PostDto;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.PostService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;

@Service
public class PostServiceImpl implements PostService {
    private final PostDAO postDAO;
    private final UserDAO userDAO;
    private final JwtService jwtService;

    @Autowired
    public PostServiceImpl(PostDAO postDAO, UserDAO userDAO,JwtService jwtService){
        this.postDAO = postDAO;
        this.userDAO = userDAO;
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
}
