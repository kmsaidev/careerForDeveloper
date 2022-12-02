package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.entity.Website;

import java.util.List;

public interface WebsiteDAO {
    List<Website> selectWebsitesByUser(User user);
}
