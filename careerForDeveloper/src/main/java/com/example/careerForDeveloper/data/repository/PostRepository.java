package com.example.careerForDeveloper.data.repository;

import com.example.careerForDeveloper.data.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
