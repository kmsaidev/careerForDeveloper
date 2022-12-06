package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.entity.Website;

import java.util.List;

public interface WebsiteDAO {
    List<Website> selectWebsitesByUser(User user);

    Website createWebsite(Website website);
    Website selectWebsiteByWebsiteName(String name, User user);
}
