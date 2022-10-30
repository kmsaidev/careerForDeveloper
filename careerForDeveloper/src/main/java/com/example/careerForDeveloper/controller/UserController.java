package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.LoginDto;
import com.example.careerForDeveloper.data.dto.UserDto;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
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
}
