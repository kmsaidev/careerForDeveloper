package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.*;
import org.hibernate.sql.Update;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    UserResponseDto saveUser(UserDto userDto) throws BaseException;

    UserResponseDto login(LoginDto loginDto) throws BaseException;
    void deleteUser(DeleteUserDto deleteUserDto) throws BaseException;

    void updateUser(UpdateUserDto updateUserDto, MultipartFile profileImage) throws BaseException;

    void updateProfile(UpdateProfileDto updateProfileDto) throws BaseException;

    ProfileResponseDto getProfile(long userId) throws BaseException;

    UserProjectResponseDto getUserProject(long userId) throws BaseException;

    List<AllPostResponseDto> getUserPost(long userId) throws BaseException;
    List<UserRequestResponseDto> getUserRequest(long userId) throws BaseException;
}
