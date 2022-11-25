package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class UpdateProjectDto {
    long userId;
    long projectId;
    String title;
    String contents;
    long categoryId;
    int limitedMember;
    String techName;
    Date startDate;
    Date endDate;

    public UpdateProjectDto(long projectId, String title, String contents, long categoryId,
                            int limitedMember, String techName, Date startDate, Date endDate){
        this.projectId = projectId;
        this.title = title;
        this.contents = contents;
        this.categoryId = categoryId;
        this.limitedMember = limitedMember;
        this.techName = techName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
