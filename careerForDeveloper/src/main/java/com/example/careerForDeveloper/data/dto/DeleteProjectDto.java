package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeleteProjectDto {
    long userId;
    long projectId;

    public DeleteProjectDto(long projectId){
        this.projectId = projectId;
    }
}
