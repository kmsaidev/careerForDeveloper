package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.UserDto;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.UserService;
import com.example.careerForDeveloper.util.JwtService;
import com.example.careerForDeveloper.util.SHA256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;

@Service
public class UserServiceImpl implements UserService {
    private final UserDAO userDAO;
    private final JwtService jwtService;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, JwtService jwtService){
        this.userDAO = userDAO;
        this.jwtService = jwtService;
    }

    @Override
    public UserResponseDto saveUser(UserDto userDto){
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setNickname(userDto.getEmail());
        String pwd = new SHA256().encrypt(userDto.getPwd());
        user.setPwd(pwd);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        user.setStatus("ACTIVE");

        User savedUser = userDAO.createUser(user);

        long savedUserId = savedUser.getUserId();
        String accessToken = jwtService.createAccessToken(savedUserId);
        String refreshToken = jwtService.createRefreshToken(savedUserId);

        return new UserResponseDto(accessToken, refreshToken);
    }
}
