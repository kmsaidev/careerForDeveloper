package com.example.careerForDeveloper.data.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateProfileDto {
    long userId;
    List<WebsiteDto> websiteList;
    String tech;
    String availableTime;

    public UpdateProfileDto(List<WebsiteDto> websiteList, String tech, String availableTime){
        this.websiteList = websiteList;
        this.tech = tech;
        this.availableTime = availableTime;
    }
}
