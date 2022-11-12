package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.User;

public interface UserDAO {
    User createUser(User user);

    User updateUserRefreshToken(long userId, String refreshToken) throws BaseException;

    User selectUserByEmail(String email);

    User selectUserById(long userId) throws BaseException;

    void deleteUser(long userId) throws BaseException;

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    void updateUser(long userId, String profileImageLoc, String nickname, String pwd) throws BaseException;
}
