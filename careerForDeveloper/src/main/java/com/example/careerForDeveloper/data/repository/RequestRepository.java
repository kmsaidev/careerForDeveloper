package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.ProjectUser;
import com.example.careerForDeveloper.data.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {
}
