package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.data.dao.RequestDAO;
import com.example.careerForDeveloper.data.entity.Request;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import com.example.careerForDeveloper.data.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
}
