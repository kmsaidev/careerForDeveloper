package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.ProjectUser;
import com.example.careerForDeveloper.data.entity.User;

import java.util.List;

public interface ProjectUserDAO {
    List<ProjectUser> selectPUByUser(User user);
    ProjectUser createProjectUser(ProjectUser projectUser);
}
