package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.data.dto.UserDto;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        UserResponseDto userResponseDto = userService.saveUser(userDto);

        return new BaseResponse<>(userResponseDto);
    }
}
