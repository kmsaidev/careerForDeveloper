package com.example.careerForDeveloper.data.dto;

import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.CommentAnswer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentResponseDto {
    String profileImageLoc;
    String nickname;
    String contents;
    boolean isMyComment;
    List<CommentAnswerDto> commentAnswerList;
}
