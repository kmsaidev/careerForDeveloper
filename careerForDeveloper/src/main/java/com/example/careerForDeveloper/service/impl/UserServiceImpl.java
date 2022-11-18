package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.*;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.UserService;
import com.example.careerForDeveloper.util.JwtService;
import com.example.careerForDeveloper.util.SHA256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public UserResponseDto saveUser(UserDto userDto) throws BaseException{
        User user = new User();
        String pwd = userDto.getPwd();
        String email = userDto.getEmail();
        String nickname = userDto.getNickname();
        if(pwd.length() < 8 || pwd.length() > 20)
            throw new BaseException(BaseResponseStatus.USERS_USERS_FAILED_PWD);
        else if(userDAO.existsByEmail(email))
            throw new BaseException(BaseResponseStatus.USERS_DUPLICATED_EMAIL);
        else if(userDAO.existsByNickname(nickname))
            throw new BaseException(BaseResponseStatus.USERS_DUPLICATED_NICKNAME);

        user.setEmail(email);
        user.setNickname(nickname);
        try {
            pwd = new SHA256().encrypt(pwd);
        } catch (Exception e) {
            throw new BaseException(BaseResponseStatus.PASSWORD_ENCRYPTION_ERROR);
        }
        user.setPwd(pwd);
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        User savedUser = userDAO.createUser(user);

        long savedUserId = savedUser.getUserId();
        String accessToken = jwtService.createAccessToken(savedUserId);
        String refreshToken = jwtService.createRefreshToken(savedUserId);

        userDAO.updateUserRefreshToken(savedUserId, refreshToken);
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
                userDAO.updateUserRefreshToken(userId, refreshToken);
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
    public void updateUser(UpdateUserDto updateUserDto, MultipartFile profileImage) throws BaseException{
        String pwd = updateUserDto.getPwd();
        String encryptPwd;
        long userId = updateUserDto.getUserId();
        if(pwd.length() < 8 || pwd.length() > 20)
            throw new BaseException(BaseResponseStatus.USERS_USERS_FAILED_PWD);
        try {
            encryptPwd = SHA256.encrypt(pwd);
        } catch (Exception e) {
            throw new BaseException(BaseResponseStatus.PASSWORD_ENCRYPTION_ERROR);
        }
        String fileName = profileImage.getOriginalFilename();
        String path = "C:/spring/image/";
        Path imagePath = Paths.get(path + fileName);
        try{
            Files.write(imagePath, profileImage.getBytes());
        } catch (Exception e){
            throw new BaseException(BaseResponseStatus.USERS_FAILED_STORE_PROFILE_IMAGE);
        }
        userDAO.updateUser(userId, path + fileName, updateUserDto.getNickname(), encryptPwd);
    }
}
