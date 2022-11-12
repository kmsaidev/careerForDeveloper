package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.AuthDAO;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthDAOImpl implements AuthDAO {
    private final UserRepository userRepository;

    @Autowired
    public AuthDAOImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public User selectUserByRefreshToken(String refreshToken){
        return userRepository.findByRefreshToken(refreshToken);
    }
}
