package com.example.careerForDeveloper.controller;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponse;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dto.UserResponseDto;
import com.example.careerForDeveloper.service.AuthService;
import com.example.careerForDeveloper.service.UserService;
import com.example.careerForDeveloper.util.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Random;
import javax.mail.MessagingException;

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

    @ResponseBody
    @PostMapping("")
    public BaseResponse<String> emailAuth(@RequestParam String certifiedCode) throws BaseException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String code = request.getHeader("CERTIFIED-CODE");

        if(certifiedCode.equals(code)){
            return new BaseResponse<>("이메일 인증 성공");
        } else{
            return new BaseResponse<>(BaseResponseStatus.USERS_FAILED_EMAIL_CERTIFICATION);
        }
    }

    @ResponseBody
    @GetMapping("/email")
    public BaseResponse<String> sendmail(@RequestParam String email) throws MessagingException {
        String authNum = certified_key();
        StringBuffer emailcontent = new StringBuffer();
        emailcontent.append("<!DOCTYPE html>");
        emailcontent.append("<html>");
        emailcontent.append("<head>");
        emailcontent.append("</head>");
        emailcontent.append("<body>");
        emailcontent.append(
                " <div" 																																																	+
                        "	style=\"font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 400px; height: 600px; border-top: 4px solid #02b875; margin: 100px auto; padding: 30px 0; box-sizing: border-box;\">"		+
                        "	<h1 style=\"margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;\">"																															+
                        "		<span style=\"font-size: 15px; margin: 0 0 10px 3px;\">CareerForDeveloper</span><br />"																													+
                        "		<span style=\"color: #02b875\">메일인증</span> 안내입니다."																																				+
                        "	</h1>\n"																																																+
                        "	<p style=\"font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;\">"																													+
                        email																																													+
                        "		님 안녕하세요.<br />"																																													+
                        "		CareerForDeveloper에 가입해 주셔서 진심으로 감사드립니다.<br />"																																						+
                        "		아래 <b style=\"color: #02b875\">'인증번호'</b> 를 입력하여 이메일 인증을 해주세요.<br />"																													+
                        "		감사합니다."																																															+
                        "<div align='center' style='border:1px solid black; font-family:verdana';>" +
                        "<div style='font-size:130%'>" +
                        "CODE : <strong>" +
                        authNum + "</strong><div><br/> " +
                        "</div>" +
                        "	</p>"	+
                        "	<div style=\"border-top: 1px solid #DDD; padding: 5px;\"></div>"																																		+
                        " </div>"
        );
        emailcontent.append("</body>");
        emailcontent.append("</html>");
        authService.sendMail(email, "[CareerForDeveloper 이메일 인증]", emailcontent.toString());
        return new BaseResponse<>(authNum);
    }

    private String certified_key() {
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        int num = 0;

        do {
            num = random.nextInt(75) + 48;
            if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
                sb.append((char) num);
            } else {
                continue;
            }

        } while (sb.length() < 10);
        return sb.toString();
    }
}
