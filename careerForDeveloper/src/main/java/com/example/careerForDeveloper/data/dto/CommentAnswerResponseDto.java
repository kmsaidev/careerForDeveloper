package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentAnswerResponseDto {
    long commentAnswerId;
    String profileImageLoc;
    String nickname;
    String contents;
    boolean isMyCommentAnswer;
}
