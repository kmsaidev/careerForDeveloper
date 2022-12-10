package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserProjectResponseDto {
    List<ProfileProjectDto> myProjectList;
    List<ProfileProjectDto> endMyProjectList;
    List<ProfileProjectDto> partProjectList;
    List<ProfileProjectDto> endPartProjectList;
}
