package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

public class UpdatePostDto {
    long userId;
    long postId;
    String title;
    String contents;

    public UpdatePostDto(long postId, String title, String contents){
        this.postId = postId;
        this.title = title;
        this.contents = contents;
    }
}
