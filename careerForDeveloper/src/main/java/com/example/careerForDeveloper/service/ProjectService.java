package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.*;

import java.util.List;

public interface ProjectService {
    long createProject(ProjectDto projectDto) throws BaseException;
    long updateProject(UpdateProjectDto updateProjectDto) throws BaseException;
    void deleteProject(DeleteProjectDto deleteProjectDto) throws BaseException;
    List<ProjectByCategoryResponseDto> getProjectsByCategory(long categoryId) throws BaseException;
    ProjectResponseDto getProject(long projectId) throws BaseException;
}
