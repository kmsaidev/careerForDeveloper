package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentAnswerDto {
    long userId;
    long commentId;
    String contents;

    public CommentAnswerDto(long commentId, String contents){
        this.commentId = commentId;
        this.contents = contents;
    }
}
