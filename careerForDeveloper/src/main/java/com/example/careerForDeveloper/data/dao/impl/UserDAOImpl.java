package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDAOImpl implements UserDAO {
    private final UserRepository userRepository;

    @Autowired
    public UserDAOImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public User createUser(User user){
        User savedUser = userRepository.save(user);

        return savedUser;
    }
}
