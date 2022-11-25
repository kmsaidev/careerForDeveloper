package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.ProjectDto;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;

import java.util.List;

public interface ProjectDAO {
    Project createProject(Project project);
    void updateProject(Project project);
    void deleteProject(Project project);

    List<Project> selectProjectsByCategory(Category category);
    Project selectProjectById(long projectId) throws BaseException;
}
