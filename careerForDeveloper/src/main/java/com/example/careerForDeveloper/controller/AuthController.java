package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.service.AuthService;
import com.example.careerForDeveloper.service.UserService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import static com.example.careerForDeveloper.config.BaseResponseStatus.ACCESS_TOKEN_REISSUE_FAIL;
import static com.example.careerForDeveloper.config.BaseResponseStatus.INVALID_JWT;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(JwtService jwtService, AuthService authService){
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @ResponseBody
    @GetMapping("")
    public BaseResponse<UserResponseDto> getAccessToken() throws BaseException {
        try {
            //refresh-token 유효성 검사
            jwtService.isValid();

            //refresh-token으로 access-token 발급
            String refreshToken = jwtService.getRefreshToken();
            UserResponseDto userResponseDto = authService.retrieveAccessToken(refreshToken);
            if (userResponseDto.getAccessToken() == null)
                throw new BaseException(ACCESS_TOKEN_REISSUE_FAIL);
            else return new BaseResponse<>(userResponseDto);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
