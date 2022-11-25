package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.ProjectDAO;
import com.example.careerForDeveloper.data.dto.ProjectDto;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.repository.PostRepository;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectDAOImpl implements ProjectDAO {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectDAOImpl(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(Project project){
        Project savedProject = projectRepository.save(project);

        return savedProject;
    }
}
