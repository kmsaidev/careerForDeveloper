package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.Profile;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.repository.ProfileRepository;

public interface ProfileDAO {
    Profile updateProfile(Profile profile);
}
