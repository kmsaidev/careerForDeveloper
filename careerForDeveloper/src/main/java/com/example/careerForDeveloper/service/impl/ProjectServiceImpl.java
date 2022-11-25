package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dao.CategoryDAO;
import com.example.careerForDeveloper.data.dao.ProjectDAO;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.ProjectDto;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.service.ProjectService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectDAO projectDAO;
    private final UserDAO userDAO;
    private final CategoryDAO categoryDAO;
    private final JwtService jwtService;

    @Autowired
    public ProjectServiceImpl(ProjectDAO projectDAO, UserDAO userDAO, CategoryDAO categoryDAO, JwtService jwtService){
        this.projectDAO = projectDAO;
        this.userDAO = userDAO;
        this.categoryDAO = categoryDAO;
        this.jwtService = jwtService;
    }

    @Override
    public long saveProject(ProjectDto projectDto) throws BaseException{
        Project project = new Project();
        project.setTitle(projectDto.getTitle());
        project.setUser(userDAO.selectUserById(projectDto.getUserId()));
        project.setCategory(categoryDAO.selectCategoryById(projectDto.getCategoryId()));
        project.setTechName(projectDto.getTechName());
        project.setLimitedMember(projectDto.getLimitedMember());
        project.setPartMember(0);
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());
        project.setContents(projectDto.getContents());
        project.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        project.setStatus("ACTIVE");

        Project savedProject = projectDAO.createProject(project);
        return savedProject.getProjectId();
    }
}
