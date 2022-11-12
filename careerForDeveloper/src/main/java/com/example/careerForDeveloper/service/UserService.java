package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.*;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    UserResponseDto saveUser(UserDto userDto) throws BaseException;

    UserResponseDto login(LoginDto loginDto) throws BaseException;
    void deleteUser(DeleteUserDto deleteUserDto) throws BaseException;

    void updateUser(UpdateUserDto updateUserDto, MultipartFile profileImage) throws BaseException;
}
