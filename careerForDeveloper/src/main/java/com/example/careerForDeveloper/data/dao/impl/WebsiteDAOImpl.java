package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.WebsiteDAO;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.entity.Website;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import com.example.careerForDeveloper.data.repository.WebsiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WebsiteDAOImpl implements WebsiteDAO {
    private final WebsiteRepository websiteRepository;

    @Autowired
    public WebsiteDAOImpl(WebsiteRepository websiteRepository){
        this.websiteRepository = websiteRepository;
    }

    @Override
    public List<Website> selectWebsitesByUser(User user){
        return websiteRepository.findAllByUser(user);
    }

    @Override
    public Website createWebsite(Website website){
        return websiteRepository.save(website);
    }

    @Override
    public Website selectWebsiteByWebsiteName(String name, User user){
        return websiteRepository.findByWebsiteNameAndUser(name, user);
    }
}
