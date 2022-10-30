package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}