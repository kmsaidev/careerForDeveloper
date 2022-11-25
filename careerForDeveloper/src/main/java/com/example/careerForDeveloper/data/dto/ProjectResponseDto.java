package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectResponseDto {
    long userId;
    String nickname;
    String introduce;

    long projectId;
    String title;
    long categoryId;
    int limitedMember;
    int partMember;
    String techName;
    Date startDate;
    Date endDate;
    String contents;
    Timestamp createdAt;
    boolean isMyProject;
}
