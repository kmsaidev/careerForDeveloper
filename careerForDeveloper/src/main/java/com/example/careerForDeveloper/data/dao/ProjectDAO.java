package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.ProjectDto;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;

public interface ProjectDAO {
    Project createProject(Project project);
    void updateProject(Project project);
    void deleteProject(Project project);
    Project selectProjectById(long projectId) throws BaseException;
}
