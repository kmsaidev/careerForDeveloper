package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findAllByProject(Project project);
    boolean existsByProjectAndUserAndStatus(Project project, User user, String status);
}
