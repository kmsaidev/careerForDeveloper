package com.example.careerForDeveloper.data.dto;

import com.example.careerForDeveloper.data.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PostResponseDto {
    long postId;
    String title;
    String contents;
    long userId;
    String nickname;
    String profileImageLoc;
    String fileLoc;
    Timestamp createdAt;
    List<CommentResponseDto> commentList;
    boolean isMyPost;
    long commentCount;
}
