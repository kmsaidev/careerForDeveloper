package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeletePostDto {
    long userId;
    long postId;

    public DeletePostDto(long postId){
        this.postId = postId;
    }
}
