package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.DeleteUserDto;
import com.example.careerForDeveloper.data.dto.LoginDto;
import com.example.careerForDeveloper.data.dto.UserDto;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.UserService;
import com.example.careerForDeveloper.util.JwtService;
import com.example.careerForDeveloper.util.SHA256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

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

    @Override
    public UserResponseDto login(LoginDto loginDto) throws BaseException {
        User findUser = userDAO.selectUserByEmail(loginDto.getEmail());
        String encryptPwd;
        UserResponseDto userResponseDto = new UserResponseDto();
        if(findUser == null)
            throw new BaseException(BaseResponseStatus.FAILED_TO_LOGIN);
        else {
            try {
                 encryptPwd = SHA256.encrypt(loginDto.getPwd());
            } catch (Exception e) {
                throw new BaseException(BaseResponseStatus.PASSWORD_ENCRYPTION_ERROR);
            }
            if (encryptPwd.equals(findUser.getPwd())){
                long userId = findUser.getUserId();
                String accessToken = jwtService.createAccessToken(userId);
                String refreshToken = jwtService.createRefreshToken(userId);
                userResponseDto.setAccessToken(accessToken);
                userResponseDto.setRefreshToken(refreshToken);
            } else{
                throw new BaseException(BaseResponseStatus.FAILED_TO_LOGIN);
            }
        }
        return userResponseDto;
    }

    @Override
    public void deleteUser(DeleteUserDto deleteUserDto) throws BaseException{
        User user;
        String encryptPwd;
        long userId = deleteUserDto.getUserId();
        try {
            user = userDAO.selectUserById(userId);
            try {
                encryptPwd = SHA256.encrypt(deleteUserDto.getPwd());
            } catch (Exception e) {
                throw new BaseException(BaseResponseStatus.PASSWORD_ENCRYPTION_ERROR);
            }
        } catch(BaseException exception){
            throw new BaseException(BaseResponseStatus.USERS_DELETE_FAIL);
        }
        if (encryptPwd.equals(user.getPwd())){
            userDAO.deleteUser(userId);
        } else{
            throw new BaseException(BaseResponseStatus.USERS_DELETE_FAIL);
        }
    }
}
