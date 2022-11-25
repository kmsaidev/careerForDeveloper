package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.*;
import org.springframework.web.multipart.MultipartFile;

public interface ProjectService {
    long saveProject(ProjectDto projectDto) throws BaseException;
    long updateProject(UpdateProjectDto updateProjectDto) throws BaseException;
    void deleteProject(DeleteProjectDto deleteProjectDto) throws BaseException;
    ProjectResponseDto getProject(long projectId) throws BaseException;
}
