package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.RequestDAO;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.Request;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import com.example.careerForDeveloper.data.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RequestDAOImpl implements RequestDAO {
    private final RequestRepository requestRepository;

    @Autowired
    public RequestDAOImpl(RequestRepository requestRepository){
        this.requestRepository = requestRepository;
    }
    @Override
    public Request createRequest(Request request){
        return requestRepository.save(request);
    }

    @Override
    public List<Request> selectRequestsByProject(Project project){
        return requestRepository.findAllByProject(project);
    }
}
