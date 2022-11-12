package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.User;

public interface AuthDAO {
    User selectUserByRefreshToken(String refreshToken) throws BaseException;
}
