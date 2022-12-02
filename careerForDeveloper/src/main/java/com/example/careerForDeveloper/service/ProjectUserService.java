package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.ProjectUserDto;
import com.example.careerForDeveloper.data.dto.ProjectUserResponseDto;

public interface ProjectUserService {
    ProjectUserResponseDto getProjectUser(long projectId, long userId) throws BaseException;
    long saveRequest(ProjectUserDto projectUserDto) throws BaseException;
}
