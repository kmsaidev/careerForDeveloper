package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
