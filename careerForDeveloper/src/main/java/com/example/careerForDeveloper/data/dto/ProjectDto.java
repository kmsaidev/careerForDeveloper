package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class ProjectDto {
    long userId;
    String title;
    long categoryId;
    int limitedMember;
    String techName;
    Date startDate;
    Date endDate;
    String contents;

    public ProjectDto(String title, long categoryId, int limitedMember, String techName,
                      Date startDate, Date endDate, String contents){
        this.title = title;
        this.categoryId = categoryId;
        this.limitedMember = limitedMember;
        this.techName = techName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.contents = contents;
    }
}
