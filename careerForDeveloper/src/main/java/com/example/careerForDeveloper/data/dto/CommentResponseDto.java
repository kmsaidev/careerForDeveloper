package com.example.careerForDeveloper.data.dto;

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
    List<CommentAnswerResponseDto> commentAnswerList;
}
