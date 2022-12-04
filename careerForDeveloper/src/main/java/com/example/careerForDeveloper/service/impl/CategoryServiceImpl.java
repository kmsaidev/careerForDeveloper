package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.data.dao.CategoryDAO;
import com.example.careerForDeveloper.data.dto.CategoryDto;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDAO categoryDAO;

    @Autowired
    public CategoryServiceImpl(CategoryDAO categoryDAO){
        this.categoryDAO = categoryDAO;
    }

    @Override
    public List<CategoryDto> getAllCategory(){
        List<CategoryDto> result = new ArrayList<>();
        List<Category> categoryList = categoryDAO.selectAllCategory();

        for(Category category : categoryList){
            CategoryDto dto = new CategoryDto();
            dto.setCategoryId(category.getCategoryId());
            dto.setCategoryName(category.getTitle());
            result.add(dto);
        }
        return result;
    }
}
