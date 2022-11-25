package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.CategoryDAO;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Post;
import com.example.careerForDeveloper.data.repository.CategoryRepository;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CategoryDAOImpl implements CategoryDAO {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryDAOImpl(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category selectCategoryById(long categoryId) throws BaseException {
        Optional<Category> selectedCategory = categoryRepository.findById(categoryId);

        if(selectedCategory.isPresent()) {
            Category category = selectedCategory.get();
            return category;
        } else {
            throw new BaseException(BaseResponseStatus.CATEGORY_FAILED_GET_CATEGORY_INFO);
        }
    }
}
