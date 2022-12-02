package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByCategory(Category category);
    List<Project> findAllByUser(User user);
}
