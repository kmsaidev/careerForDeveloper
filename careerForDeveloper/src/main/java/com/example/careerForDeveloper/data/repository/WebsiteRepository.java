package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.ProjectUser;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.entity.Website;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WebsiteRepository extends JpaRepository<Website, Long> {
    List<Website> findAllByUser(User user);
}
