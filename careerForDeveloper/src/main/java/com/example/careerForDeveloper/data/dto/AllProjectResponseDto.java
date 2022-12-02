package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AllProjectResponseDto {
    long userId;
    String nickname;
    String profileImageLoc;

    long projectId;
    long categoryId;
    String title;
    String contents;
    Timestamp createdAt;
    int limitedMember;
    int partMember;
}
