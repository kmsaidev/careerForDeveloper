package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Category;

import java.util.List;

public interface CategoryDAO {
    Category selectCategoryById(long categoryId) throws BaseException;
    List<Category> selectAllCategory();
}
