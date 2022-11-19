package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeleteCommentDto {
    long userId;
    long commentId;

    public DeleteCommentDto(long commentId){
        this.commentId = commentId;
    }
}
