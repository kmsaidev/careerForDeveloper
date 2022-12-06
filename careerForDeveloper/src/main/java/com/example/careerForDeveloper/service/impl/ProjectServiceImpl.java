package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.CategoryDAO;
import com.example.careerForDeveloper.data.dao.ProjectDAO;
import com.example.careerForDeveloper.data.dao.ProjectUserDAO;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.*;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.ProjectUser;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.ProjectService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectDAO projectDAO;
    private final ProjectUserDAO projectUserDAO;
    private final UserDAO userDAO;
    private final CategoryDAO categoryDAO;
    private final JwtService jwtService;

    @Autowired
    public ProjectServiceImpl(ProjectDAO projectDAO, ProjectUserDAO projectUserDAO, UserDAO userDAO, CategoryDAO categoryDAO, JwtService jwtService){
        this.projectDAO = projectDAO;
        this.projectUserDAO = projectUserDAO;
        this.userDAO = userDAO;
        this.categoryDAO = categoryDAO;
        this.jwtService = jwtService;
    }

    @Override
    public long createProject(ProjectDto projectDto) throws BaseException{
        Project project = new Project();
        User user = userDAO.selectUserById(projectDto.getUserId());
        project.setTitle(projectDto.getTitle());
        project.setUser(user);
        project.setCategory(categoryDAO.selectCategoryById(projectDto.getCategoryId()));
        project.setTechName(projectDto.getTechName());
        project.setLimitedMember(projectDto.getLimitedMember());
        project.setPartMember(1);
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());
        project.setContents(projectDto.getContents());
        project.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        project.setStatus("ACTIVE");

        Project savedProject = projectDAO.createProject(project);
        ProjectUser pu = new ProjectUser();
        pu.setProject(savedProject);
        pu.setUser(user);

        ProjectUser savedPu = projectUserDAO.createProjectUser(pu);
        return savedProject.getProjectId();
    }

    @Override
    public long updateProject(UpdateProjectDto updateProjectDto) throws BaseException{
        Project project= projectDAO.selectProjectById(updateProjectDto.getProjectId());
        if(updateProjectDto.getUserId() != project.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        project.setTitle(updateProjectDto.getTitle());
        project.setContents(updateProjectDto.getContents());
        project.setCategory(categoryDAO.selectCategoryById(updateProjectDto.getCategoryId()));
        project.setLimitedMember(updateProjectDto.getLimitedMember());
        project.setTechName(updateProjectDto.getTechName());
        project.setStartDate(updateProjectDto.getStartDate());
        project.setEndDate(updateProjectDto.getEndDate());
        projectDAO.updateProject(project);
        return project.getProjectId();
    }

    @Override
    public void deleteProject(DeleteProjectDto deleteProjectDto) throws BaseException{
        Project project = projectDAO.selectProjectById(deleteProjectDto.getProjectId());
        if(deleteProjectDto.getUserId() != project.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        projectDAO.deleteProject(project);
    }

    @Override
    public List<AllProjectResponseDto> getAllProject() throws BaseException{
        List<AllProjectResponseDto> result = new ArrayList<>();
        List<Project> projectList = projectDAO.selectAllProject();

        for(Project project : projectList){
            AllProjectResponseDto projectDto = new AllProjectResponseDto();
            projectDto.setUserId(project.getUser().getUserId());
            projectDto.setNickname(project.getUser().getNickname());
            projectDto.setProfileImageLoc(project.getUser().getProfileImageLoc());
            projectDto.setProjectId(project.getProjectId());
            projectDto.setCategoryId(project.getCategory().getCategoryId());
            projectDto.setTitle(project.getTitle());
            projectDto.setContents(project.getContents());
            projectDto.setCreatedAt(project.getCreatedAt());
            projectDto.setLimitedMember(project.getLimitedMember());
            projectDto.setPartMember(project.getPartMember());
            result.add(projectDto);
        }
        return result;
    }
    @Override
    public List<AllProjectResponseDto> getProjectsByCategory(long categoryId) throws BaseException{
        List<AllProjectResponseDto> result = new ArrayList<>();
        Category category = categoryDAO.selectCategoryById(categoryId);
        List<Project> projectList = projectDAO.selectProjectsByCategory(category);

        for(Project project : projectList){
            AllProjectResponseDto projectDto = new AllProjectResponseDto();
            projectDto.setUserId(project.getUser().getUserId());
            projectDto.setNickname(project.getUser().getNickname());
            projectDto.setProfileImageLoc(project.getUser().getProfileImageLoc());
            projectDto.setProjectId(project.getProjectId());
            projectDto.setCategoryId(project.getCategory().getCategoryId());
            projectDto.setTitle(project.getTitle());
            projectDto.setContents(project.getContents());
            projectDto.setCreatedAt(project.getCreatedAt());
            projectDto.setLimitedMember(project.getLimitedMember());
            projectDto.setPartMember(project.getPartMember());
            result.add(projectDto);
        }
        return result;
    }

    @Override
    public ProjectResponseDto getProject(long projectId) throws BaseException{
        Project project = projectDAO.selectProjectById(projectId);

        ProjectResponseDto result = new ProjectResponseDto();
        result.setUserId(project.getUser().getUserId());
        result.setNickname(project.getUser().getNickname());
        result.setProfileImageLoc(project.getUser().getProfileImageLoc());
        result.setIntroduce(project.getUser().getIntroduce());
        result.setProjectId(project.getProjectId());
        result.setTitle(project.getTitle());
        result.setCategoryId(project.getCategory().getCategoryId());
        result.setLimitedMember(project.getLimitedMember());
        result.setPartMember(project.getPartMember());
        result.setTechName(project.getTechName());
        result.setStartDate(project.getStartDate());
        result.setEndDate(project.getEndDate());
        result.setContents(project.getContents());
        result.setCreatedAt(project.getCreatedAt());

        return result;
    }
}
