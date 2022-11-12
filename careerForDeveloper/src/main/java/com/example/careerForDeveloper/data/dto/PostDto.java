package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDto {
    long userId;
    String title;
    String contents;

    public PostDto(String title, String contents){
        this.title = title;
        this.contents = contents;
    }
}
