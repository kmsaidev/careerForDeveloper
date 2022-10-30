package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.LoginDto;
import com.example.careerForDeveloper.data.dto.UserDto;
import com.example.careerForDeveloper.data.dto.UserResponseDto;

public interface UserService {
    UserResponseDto saveUser(UserDto userDto) throws BaseException;

    UserResponseDto login(LoginDto loginDto) throws BaseException;
}
