package com.example.careerForDeveloper.service.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.AuthDAO;
import com.example.careerForDeveloper.data.dao.UserDAO;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.service.AuthService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthDAO authDAO;
    private final JwtService jwtService;

    @Autowired
    public AuthServiceImpl(AuthDAO authDAO, JwtService jwtService){
        this.authDAO = authDAO;
        this.jwtService = jwtService;
    }


    @Override
    public UserResponseDto retrieveAccessToken(String refreshToken) throws BaseException {
        User findUser = authDAO.selectUserByRefreshToken(refreshToken);

        if(findUser == null)
            throw new BaseException(BaseResponseStatus.LOGIN_TIME_OUT_ERROR);
        else{
            String accessToken = jwtService.createAccessToken(findUser.getUserId());
            return new UserResponseDto(accessToken, refreshToken);
        }
    }
}
