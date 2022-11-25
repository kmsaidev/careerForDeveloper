package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.dto.ProjectDto;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;

public interface ProjectDAO {
    Project createProject(Project project);
}
