package com.example.careerForDeveloper.data.repository;


import com.example.careerForDeveloper.data.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
