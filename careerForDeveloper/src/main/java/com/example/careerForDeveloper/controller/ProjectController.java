package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.*;
import com.example.careerForDeveloper.service.PostService;
import com.example.careerForDeveloper.service.ProjectService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final JwtService jwtService;

    @Autowired
    public ProjectController(ProjectService projectService, JwtService jwtService){
        this.projectService = projectService;
        this.jwtService = jwtService;
    }

    @PostMapping("")
    public BaseResponse<Long> createProject(@RequestBody ProjectDto projectDto){
        try{
            long userIdByJwt = jwtService.getUserId();

            projectDto.setUserId(userIdByJwt);
            long projectId = projectService.saveProject(projectDto);
            return new BaseResponse<>(projectId);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @PutMapping("")
    public BaseResponse<Long> updateProject(@RequestBody UpdateProjectDto updateProjectDto){
        try{
            long userIdByJwt = jwtService.getUserId();
            updateProjectDto.setUserId(userIdByJwt);

            long projectId = projectService.updateProject(updateProjectDto);
            return new BaseResponse<>(projectId);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @DeleteMapping("")
    public BaseResponse<String> deleteProject(@RequestBody DeleteProjectDto deleteProjectDto){
        try{
            long userIdByJwt = jwtService.getUserId();
            deleteProjectDto.setUserId(userIdByJwt);

            projectService.deleteProject(deleteProjectDto);
            return new BaseResponse<>("성공적으로 삭제되었습니다.");
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @GetMapping("/category")
    public BaseResponse<List<ProjectByCategoryResponseDto>> getProjectsByCategory
            (@RequestParam long categoryId){
        try {
            List<ProjectByCategoryResponseDto> projectList = projectService.getProjectsByCategory(categoryId);
            return new BaseResponse<>(projectList);
        } catch(BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @GetMapping("/project")
    public BaseResponse<ProjectResponseDto> getProject(@RequestParam long projectId){
        try{
            long userIdByJwt = jwtService.getUserId();
            ProjectResponseDto projectResponseDto = projectService.getProject(projectId);

            projectResponseDto.setMyProject(projectResponseDto.getUserId() == userIdByJwt);
            return new BaseResponse<>(projectResponseDto);
        } catch(BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
