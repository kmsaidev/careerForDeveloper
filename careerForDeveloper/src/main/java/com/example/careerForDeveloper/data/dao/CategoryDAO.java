package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Category;

public interface CategoryDAO {
    Category selectCategoryById(long categoryId) throws BaseException;
}
