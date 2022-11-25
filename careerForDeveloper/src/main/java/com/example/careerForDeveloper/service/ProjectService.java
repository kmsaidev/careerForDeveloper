package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.PostDto;
import com.example.careerForDeveloper.data.dto.ProjectDto;
import org.springframework.web.multipart.MultipartFile;

public interface ProjectService {
    long saveProject(ProjectDto projectDto) throws BaseException;
}
