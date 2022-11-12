package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.UserResponseDto;

public interface AuthService {
    UserResponseDto retrieveAccessToken(String refreshToken) throws BaseException;
}
