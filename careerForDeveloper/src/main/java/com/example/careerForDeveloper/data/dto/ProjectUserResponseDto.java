package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectUserResponseDto {
    long projectId;
    String title;
    String contents;
    long userId;
    String nickname;
    String profileImageLoc;
    String tech;
}
