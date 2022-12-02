package com.example.careerForDeveloper.data.dao;

import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.Request;

import java.util.List;

public interface RequestDAO {
    Request createRequest(Request request);
    List<Request> selectRequestsByProject(Project project);
}
