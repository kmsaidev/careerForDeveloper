package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCommentAnswerDto {
    long userId;
    long commentAnswerId;
    String contents;

    public UpdateCommentAnswerDto(long commentAnswerId, String contents){
        this.commentAnswerId = commentAnswerId;
        this.contents = contents;
    }
}
