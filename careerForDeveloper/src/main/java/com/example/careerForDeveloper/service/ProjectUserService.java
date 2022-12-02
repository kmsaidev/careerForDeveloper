package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.AllRequestResponseDto;
import com.example.careerForDeveloper.data.dto.ProfileResponseDto;
import com.example.careerForDeveloper.data.dto.ProjectUserDto;
import com.example.careerForDeveloper.data.dto.ProjectUserResponseDto;

public interface ProjectUserService {
    long createProjectUser(long requestId, long userId) throws BaseException;
    ProjectUserResponseDto getProjectUser(long projectId, long userId) throws BaseException;
    long saveRequest(ProjectUserDto projectUserDto) throws BaseException;
    AllRequestResponseDto getRequest(long projectId, long userId) throws BaseException;

    ProfileResponseDto getRequestProfile(long requestId) throws BaseException;

    void updateRequest(long requestId, long userId, String value) throws BaseException;
}
