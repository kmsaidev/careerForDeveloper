package com.example.careerForDeveloper.config;

import lombok.Getter;

@Getter
public enum BaseResponseStatus {
    /**
     * 1000 : 요청 성공
     */
    SUCCESS(true, 1000, "요청에 성공하였습니다."),


    /**
     * 2000 : Request 오류
     */
    // Common
    REQUEST_ERROR(false, 2000, "입력값을 확인해주세요."),
    EMPTY_JWT(false, 2001, "JWT를 입력해주세요."),
    INVALID_JWT(false, 2002, "유효하지 않은 JWT입니다."),
    INVALID_USER_JWT(false,2003,"권한이 없는 유저의 접근입니다."),

    // users
    USERS_USERS_FAILED_NAME(false, 2005, "이름 글자 수를 확인해주세요."),
    USERS_USERS_FAILED_ID(false, 2006, "아이디 글자 수를 확인해주세요."),
    USERS_USERS_FAILED_NICK(false, 2007, "닉네임 글자 수를 확인해주세요."),
    USERS_USERS_FAILED_PWD(false, 2008, "비밀번호 글자 수를 확인해주세요."),
    USERS_EMPTY_USER_ID(false, 2010, "유저 아이디 값을 확인해주세요."),
    USERS_FAILED_GET_USER_INFO(false, 2011, "유저 정보 확인에 실패했습니다."),
    USERS_DUPLICATED_EMAIL(false, 2061, "중복된 이메일입니다."),
    USERS_DUPLICATED_NICKNAME(false, 2062, "중복된 닉네임입니다."),
    USERS_DELETE_FAIL(false, 2063, "회원 탈퇴 실패하였습니다."),
    USERS_FAILED_EMAIL_CERTIFICATION(false, 2064, "이메일 인증 실패하였습니다."),
    USERS_FAILED_STORE_PROFILE_IMAGE(false, 2065, "프로필 이미지 저장 실패하였습니다."),



    // posts
    POSTS_EMPTY_CATEGORY_ID(false, 2012, "카테고리 아이디 값을 확인해주세요."),
    POSTS_FAILED_UPLOAD(false,2013,"게시물 등록에 실패했습니다."),
    POST_INPUT_FAILED_DEADLINE(false,2014,"제출기한을 잘못 입력하였습니다"),

    // [POST] /users
    POST_USERS_EMPTY_ID(false, 2015, "아이디를 입력해주세요."),
    POST_USERS_INVALID_EMAIL(false, 2016, "이메일 형식을 확인해주세요."),
    POST_USERS_EXISTS_EMAIL(false,2017,"중복된 이메일입니다."),

    POST_INPUT_FAILED_TITLE(false, 2018, "제목의 글자 수를 확인해주세요."),
    POST_INPUT_FAILED_CONTENTS(false, 2019, "내용의 글자 수를 확인해주세요."),
    POSTS_EMPTY_POST_ID(false, 2020, "게시물 아이디 값을 확인해주세요."),
    POST_EMPTY_POST_DETAIL_ID(false, 2021, "존재하지 않는 질문입니다."),
    POST_STATUS_INACTIVE(false, 2022, "게시물이 INACTIVE 상태입니다."),

    POST_USERS_EMPTY_PASSWORD(false, 2030, "비밀번호를 입력해주세요."),
    POST_USERS_INVALID_PASSWORD(false, 2031, "비밀번호 형식을 확인해주세요."),
    POST_USERS_INVALID_ID(false, 2032, "없는 아이디입니다."),
    POST_FAILED_STORE_ATTACHED_FILE(false, 2033, "파일 첨부 실패했습니다."),

    //comment
    COMMENT_FAILED_GET_COMMENT_INFO(false, 2050, "댓글 정보를 가져오는 데 실패했습니다."),
    COMMENT_ANSWER_FAILED_GET_COMMENT_ANSWER_INFO(false, 2051, "대댓글 정보를 가져오는 데 실패했습니다."),
    //category
    CATEGORY_FAILED_GET_CATEGORY_INFO(false, 2070, "카테고리 정보를 가져오는 데 실패했습니다."),
    //project
    PROJECT_FAILED_GET_PROJECT_INFO(false, 2080, "프로젝트 정보를 가져오는 데 실패했습니다."),
    PROJECT_FULL_MEMBER(false, 2081, "프로젝트 인원이 다 찼습니다."),
    //request
    REQUEST_FAILED_GET_REQUEST_INFO(false, 2090, "신청서 정보를 가져오는 데 실패했습니다."),
    REQUEST_ALREADY_REQUEST(false, 2091, "이미 참여 신청한 프로젝트입니다."),


    /**
     * 3000 : Response 오류
     */
    // Common
    RESPONSE_ERROR(false, 3000, "값을 불러오는데 실패하였습니다."),

    // [POST] /users
    DUPLICATED_EMAIL(false, 3013, "중복된 이메일입니다."),
    FAILED_TO_LOGIN(false,3014,"없는 아이디거나 비밀번호가 틀렸습니다."),

    MODIFY_FAIL_POST(false, 3020, "게시물 수정을 실패했습니다."),
    DELETE_FAIL_POST(false, 3021, "게시물 삭제를 실패했습니다."),

    /**
     * 4000 : Database, Server 오류
     */
    DATABASE_ERROR(false, 4000, "데이터베이스 연결에 실패하였습니다."),
    SERVER_ERROR(false, 4001, "서버와의 연결에 실패하였습니다."),

    //[PATCH] /users/{userIdx}
    MODIFY_FAIL_USERNAME(false,4014,"유저네임 수정 실패"),

    PASSWORD_ENCRYPTION_ERROR(false, 4011, "비밀번호 암호화에 실패하였습니다."),
    PASSWORD_DECRYPTION_ERROR(false, 4012, "비밀번호 복호화에 실패하였습니다."),


    // 5000 : 필요시 만들어서 쓰세요
    LOGIN_TIME_OUT_ERROR(false, 5001, "로그인 시간이 만료되었습니다."),
    ACCESS_TOKEN_REISSUE_FAIL(false, 5002, "토큰 재발급에 실패하였습니다.");
    // 6000 : 필요시 만들어서 쓰세요


    private final boolean isSuccess;
    private final int code;
    private final String message;

    private BaseResponseStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}
