package com.example.careerForDeveloper.service;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.dto.UserResponseDto;

import javax.mail.MessagingException;

public interface AuthService {
    UserResponseDto retrieveAccessToken(String refreshToken) throws BaseException;

    void sendMail(String toEmail, String subject, String message) throws MessagingException;
}
