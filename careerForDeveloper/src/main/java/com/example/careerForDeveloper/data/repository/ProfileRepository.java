package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
