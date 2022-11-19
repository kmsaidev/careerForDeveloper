package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeleteCommentAnswerDto {
    long userId;
    long commentAnswerId;

    public DeleteCommentAnswerDto(long commentAnswerId){
        this.commentAnswerId = commentAnswerId;
    }
}
