package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.DeleteUserDto;
import com.example.careerForDeveloper.data.dto.LoginDto;
import com.example.careerForDeveloper.data.dto.UserDto;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.service.UserService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService){
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("")
    public BaseResponse<UserResponseDto> createUser(@RequestBody UserDto userDto) throws BaseException {
        try {
            UserResponseDto userResponseDto = userService.saveUser(userDto);

            return new BaseResponse<>(userResponseDto);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @PostMapping("/login")
    public BaseResponse<UserResponseDto> login(@RequestBody LoginDto loginDto) throws BaseException{
        try {
            UserResponseDto userResponseDto = userService.login(loginDto);

            return new BaseResponse<>(userResponseDto);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @DeleteMapping("")
    public BaseResponse<String> deleteUser(@RequestBody DeleteUserDto deleteUserDto) throws BaseException{
        try{
            long userIdByJwt = jwtService.getUserId();

            deleteUserDto.setUserId(userIdByJwt);
            userService.deleteUser(deleteUserDto);
            return new BaseResponse<>("성공적으로 삭제되었습니다.");
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
