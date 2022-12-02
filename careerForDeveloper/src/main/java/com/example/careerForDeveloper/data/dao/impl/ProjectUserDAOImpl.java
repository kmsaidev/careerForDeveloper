package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.ProjectUserDAO;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import com.example.careerForDeveloper.data.repository.ProjectUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectUserDAOImpl implements ProjectUserDAO {
    private final ProjectUserRepository projectUserRepository;

    @Autowired
    public ProjectUserDAOImpl(ProjectUserRepository projectUserRepository){
        this.projectUserRepository = projectUserRepository;
    }
}
