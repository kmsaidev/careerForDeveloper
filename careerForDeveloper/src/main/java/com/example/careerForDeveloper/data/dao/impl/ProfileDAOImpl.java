package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.ProfileDAO;
import com.example.careerForDeveloper.data.entity.Profile;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.repository.ProfileRepository;
import com.example.careerForDeveloper.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProfileDAOImpl implements ProfileDAO {
    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileDAOImpl(ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }

    @Override
    public Profile updateProfile(Profile profile){
        return profileRepository.save(profile);
    }
}
