package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.ProjectUser;
import com.example.careerForDeveloper.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectUserRepository extends JpaRepository<ProjectUser, Long> {
    List<ProjectUser> findAllByUser(User user);
    boolean existsByProjectAndUser(Project project, User user);
}
