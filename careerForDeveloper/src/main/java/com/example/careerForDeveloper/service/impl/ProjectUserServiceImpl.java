package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.*;
import com.example.careerForDeveloper.data.dto.*;
import com.example.careerForDeveloper.data.entity.*;
import com.example.careerForDeveloper.service.ProjectUserService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectUserServiceImpl implements ProjectUserService {
    private final ProjectUserDAO projectUserDAO;
    private final ProjectDAO projectDAO;
    private final UserDAO userDAO;
    private final RequestDAO requestDAO;
    private final WebsiteDAO websiteDAO;
    private final JwtService jwtService;

    @Autowired
    public ProjectUserServiceImpl(ProjectUserDAO projectUserDAO, ProjectDAO projectDAO,
                                  UserDAO userDAO, RequestDAO requestDAO,
                                  WebsiteDAO websiteDAO, JwtService jwtService){
        this.projectUserDAO = projectUserDAO;
        this.projectDAO = projectDAO;
        this.userDAO = userDAO;
        this.requestDAO = requestDAO;
        this.websiteDAO = websiteDAO;
        this.jwtService = jwtService;
    }
    @Override
    public long createProjectUser(long requestId, long userId) throws BaseException{
        Request request = requestDAO.selectRequestById(requestId);
        if(userId != request.getProject().getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        Project project = request.getProject();
        if(project.getStatus().equals("CLOSED")) {
            throw new BaseException(BaseResponseStatus.PROJECT_FULL_MEMBER);
        }
        ProjectUser pu = new ProjectUser();
        pu.setProject(project);
        pu.setUser(request.getUser());

        updateRequest(requestId, userId, "APPROVE");
        ProjectUser savedPu = projectUserDAO.createProjectUser(pu);

        project.setPartMember(project.getPartMember() + 1);
        projectDAO.updateProject(project);
        if(project.getPartMember() == project.getLimitedMember()){
            project.setStatus("CLOSED");
            projectDAO.updateProject(project);
        }
        return savedPu.getProjectUserId();
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

        if(requestDAO.existsByProjectAndUser(project, user, "ACTIVE") ||
                projectUserDAO.existsByProjectAndUser(project, user))
            throw new BaseException(BaseResponseStatus.REQUEST_ALREADY_REQUEST);

        if(project.getStatus().equals("CLOSED")) {
            throw new BaseException(BaseResponseStatus.PROJECT_FULL_MEMBER);
        }
        request.setProject(project);
        request.setUser(user);
        request.setContents(projectUserDto.getContents());
        request.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        request.setStatus("ACTIVE");

        Request savedRequest = requestDAO.createRequest(request);
        return savedRequest.getRequestId();
    }

    @Override
    public AllRequestResponseDto getRequest(long projectId, long userId) throws BaseException{
        Project project = projectDAO.selectProjectById(projectId);
        if(userId != project.getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        List<Request> requestList = requestDAO.selectRequestsByProject(project);
        List<RequestResponseDto> requestResponse = new ArrayList<>();
        int count = 0;
        for(Request request : requestList){
            if(request.getStatus().equals("APPROVE") || request.getStatus().equals("REFUSE"))
                continue;
            long requestId = request.getRequestId();
            User user = request.getUser();
            long requestUserId = user.getUserId();
            String nickname = user.getNickname();
            String profileImageLoc = user.getProfileImageLoc();
            String tech;
            if(user.getProfile() == null)
                tech = null;
            else
                tech = user.getProfile().getTech();
            count++;
            requestResponse.add(new RequestResponseDto(requestId, requestUserId, nickname, profileImageLoc, tech));
        }
        AllRequestResponseDto result = new AllRequestResponseDto(requestResponse, count);
        return result;
    }

    @Override
    public RequestProfileResponseDto getRequestProfile(long requestId) throws BaseException{
        Request request = requestDAO.selectRequestById(requestId);
        User user = userDAO.selectUserById(request.getUser().getUserId());
        List<ProjectUser> partProject = projectUserDAO.selectPUByUser(user);

        List<ProfileProjectDto> partProjectList = new ArrayList<>();
        for(ProjectUser projectUser : partProject){
            long projectId = projectUser.getProject().getProjectId();
            Project project = projectDAO.selectProjectById(projectId);
            ProfileProjectDto dto = new ProfileProjectDto();
            dto.setProjectId(project.getProjectId());
            dto.setTitle(project.getTitle());
            dto.setCategoryId(project.getCategory().getCategoryId());
            dto.setStatus(project.getStatus());
            partProjectList.add(dto);
        }

        List<Website> list = websiteDAO.selectWebsitesByUser(user);
        List<WebsiteDto> websiteList = new ArrayList<>();
        for(Website website : list){
            websiteList.add(new WebsiteDto(website.getWebsiteName(), website.getWebsite()));
        }

        Profile profile = user.getProfile();
        String tech, availableTime;
        if(profile == null){
            tech = null;
            availableTime = null;
        } else{
            tech = profile.getTech();
            availableTime = profile.getAvailableTime();
        }

        RequestProfileResponseDto result = new RequestProfileResponseDto(partProjectList, websiteList,
                tech, availableTime, request.getContents());

        return result;
    }

    @Override
    public void updateRequest(long requestId, long userId, String value) throws BaseException{
        Request request = requestDAO.selectRequestById(requestId);
        if(userId != request.getProject().getUser().getUserId())
            throw new BaseException(BaseResponseStatus.INVALID_USER_JWT);

        request.setStatus(value);

        requestDAO.updateRequest(request);
    }
}
