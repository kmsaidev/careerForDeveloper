package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.ProjectDAO;
import com.example.careerForDeveloper.data.dto.ProjectDto;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.PostRepository;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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

    @Override
    public void updateProject(Project project){
        projectRepository.save(project);
    }

    @Override
    public void deleteProject(Project project){
        projectRepository.delete(project);
    }

    @Override
    public List<Project> selectProjectsByCategory(Category category){
        return projectRepository.findAllByCategory(category);
    }

    @Override
    public Project selectProjectById(long projectId) throws BaseException{
        Optional<Project> selectedProject = projectRepository.findById(projectId);

        if(selectedProject.isPresent()) {
            Project project = selectedProject.get();
            return project;
        } else {
            throw new BaseException(BaseResponseStatus.PROJECT_FAILED_GET_PROJECT_INFO);
        }
    }

    @Override
    public List<Project> selectProjectsByUser(User user){
        return projectRepository.findAllByUser(user);
    }
}
