package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDAOImpl implements UserDAO {
    private final UserRepository userRepository;

    @Autowired
    public UserDAOImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User updateUserRefreshToken(long userId, String refreshToken) throws BaseException{
        User findUser = selectUserById(userId);
        findUser.setRefreshToken(refreshToken);
        User updatedUser = userRepository.save(findUser);

        return updatedUser;
    }

    @Override
    public User selectUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public User selectUserById(long userId) throws BaseException{
        Optional<User> selectedUser = userRepository.findById(userId);

        if(selectedUser.isPresent()) {
            User user = selectedUser.get();
            return user;
        } else {
            throw new BaseException(BaseResponseStatus.USERS_FAILED_GET_USER_INFO);
        }
    }

    @Override
    public void deleteUser(long userId) throws BaseException {
        try {
            User user = selectUserById(userId);
            userRepository.delete(user);
        } catch (BaseException exception){
            throw new BaseException(BaseResponseStatus.USERS_DELETE_FAIL);
        }
    }

    @Override
    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByNickname(String nickname){
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public void updateUser(long userId, String profileImageLoc, String nickname, String pwd) throws BaseException{
        User findUser = selectUserById(userId);
        findUser.setProfileImageLoc(profileImageLoc);
        findUser.setNickname(nickname);
        findUser.setPwd(pwd);
        User updateUser = userRepository.save(findUser);
    }
}
