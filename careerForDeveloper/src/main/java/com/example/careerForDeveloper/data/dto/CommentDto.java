package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    long userId;
    long postId;
    String contents;

    public CommentDto(long postId, String contents){
        this.postId = postId;
        this.contents = contents;
    }
}
