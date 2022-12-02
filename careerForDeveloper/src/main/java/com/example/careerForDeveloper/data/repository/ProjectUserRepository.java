package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.ProjectUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectUserRepository extends JpaRepository<ProjectUser, Long> {
}
