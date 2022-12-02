package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.ProjectResponseDto;
import com.example.careerForDeveloper.data.dto.ProjectUserResponseDto;
import com.example.careerForDeveloper.service.ProjectService;
import com.example.careerForDeveloper.service.ProjectUserService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project-users")
public class ProjectUserController {
    private final ProjectUserService projectUserService;
    private final ProjectService projectService;
    private final JwtService jwtService;

    @Autowired
    public ProjectUserController(ProjectUserService projectUserService, ProjectService projectService,
                                 JwtService jwtService){
        this.projectUserService = projectUserService;
        this.projectService = projectService;
        this.jwtService = jwtService;
    }
    @GetMapping("")
    public BaseResponse<ProjectUserResponseDto> getProjectUser(@RequestParam long projectId){
        try{
            long userIdByJwt = jwtService.getUserId();
            ProjectUserResponseDto projectUserResponseDto =
                    projectUserService.getProjectUser(projectId, userIdByJwt);

            return new BaseResponse<>(projectUserResponseDto);
        } catch(BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
