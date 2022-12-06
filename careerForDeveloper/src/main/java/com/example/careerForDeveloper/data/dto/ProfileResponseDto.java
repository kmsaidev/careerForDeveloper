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
public class ProfileResponseDto {
    List<ProfileProjectDto> partProjectList;
    List<WebsiteDto> websites;
    String tech;
    String availableTime;
}
