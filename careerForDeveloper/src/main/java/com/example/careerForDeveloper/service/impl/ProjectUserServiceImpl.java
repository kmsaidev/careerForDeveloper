package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dao.CategoryDAO;
import com.example.careerForDeveloper.data.dao.ProjectDAO;
import com.example.careerForDeveloper.data.dao.RequestDAO;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.ProjectUserDto;
import com.example.careerForDeveloper.data.dto.ProjectUserResponseDto;
import com.example.careerForDeveloper.data.entity.Comment;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.Request;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.ProjectUserService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ProjectUserServiceImpl implements ProjectUserService {
    private final ProjectDAO projectDAO;
    private final UserDAO userDAO;
    private final RequestDAO requestDAO;
    private final JwtService jwtService;

    @Autowired
    public ProjectUserServiceImpl(ProjectDAO projectDAO, UserDAO userDAO, RequestDAO requestDAO, JwtService jwtService){
        this.projectDAO = projectDAO;
        this.userDAO = userDAO;
        this.requestDAO = requestDAO;
        this.jwtService = jwtService;
    }


    @Override
    public ProjectUserResponseDto getProjectUser(long projectId, long userId) throws BaseException {
        Project project = projectDAO.selectProjectById(projectId);
        User user = userDAO.selectUserById(userId);

        ProjectUserResponseDto result = new ProjectUserResponseDto();
        result.setProjectId(projectId);
        result.setUserId(userId);
        result.setTitle(project.getTitle());
        result.setContents(project.getContents());
        result.setNickname(user.getNickname());
        result.setProfileImageLoc(user.getProfileImageLoc());
        if(user.getProfile() == null)
            result.setTech(null);
        else
            result.setTech(user.getProfile().getTech());

        return result;
    }

    @Override
    public long saveRequest(ProjectUserDto projectUserDto) throws BaseException{
        Request request = new Request();
        Project project = projectDAO.selectProjectById(projectUserDto.getProjectId());
        User user = userDAO.selectUserById(projectUserDto.getUserId());
        request.setProject(project);
        request.setUser(user);
        request.setContents(projectUserDto.getContents());
        request.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        request.setStatus("ACTIVE");

        Request savedRequest = requestDAO.createRequest(request);
        return savedRequest.getRequestId();
    }
}
