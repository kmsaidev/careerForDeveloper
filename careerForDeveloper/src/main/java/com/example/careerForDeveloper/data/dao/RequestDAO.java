package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.Request;
import com.example.careerForDeveloper.data.entity.User;

import java.util.List;

public interface RequestDAO {
    Request createRequest(Request request);
    void updateRequest(Request request);
    List<Request> selectRequestsByProject(Project project);
    Request selectRequestById(long requestId) throws BaseException;

    boolean existsByProjectAndUser(Project project, User user, String status);
}
