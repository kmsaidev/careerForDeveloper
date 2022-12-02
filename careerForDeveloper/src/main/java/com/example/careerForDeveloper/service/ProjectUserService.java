package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.AllRequestResponseDto;
import com.example.careerForDeveloper.data.dto.ProjectUserDto;
import com.example.careerForDeveloper.data.dto.ProjectUserResponseDto;

import java.util.List;

public interface ProjectUserService {
    ProjectUserResponseDto getProjectUser(long projectId, long userId) throws BaseException;
    long saveRequest(ProjectUserDto projectUserDto) throws BaseException;
    List<AllRequestResponseDto> getRequest(long projectId, long userId) throws BaseException;
}
