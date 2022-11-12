package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.User;

public interface UserDAO {
    User createUser(User user);

    User selectUserByEmail(String email);

    User selectUserById(long userId) throws BaseException;

    void deleteUser(long userId) throws BaseException;

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);
}
