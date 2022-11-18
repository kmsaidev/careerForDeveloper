package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCommentDto {
    long userId;
    long commentId;
    String contents;

    public UpdateCommentDto(long userId, long commentId, String contents){
        this.userId = userId;
        this.commentId = commentId;
        this.contents = contents;
    }
}
