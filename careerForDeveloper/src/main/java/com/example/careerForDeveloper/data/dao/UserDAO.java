package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.User;

public interface UserDAO {
    User createUser(User user);

    User selectUser(String email);
}
