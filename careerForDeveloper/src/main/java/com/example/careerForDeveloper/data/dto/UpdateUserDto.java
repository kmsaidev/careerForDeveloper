package com.example.careerForDeveloper.data.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDto {
    long userId;
    String nickname;
    String pwd;

    public UpdateUserDto(String nickname, String pwd){
        this.nickname = nickname;
        this.pwd = pwd;
    }
}
