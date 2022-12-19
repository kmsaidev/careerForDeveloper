package com.example.careerForDeveloper.data.dao.impl;

import com.example.careerForDeveloper.config.BaseException;
import com.example.careerForDeveloper.config.BaseResponseStatus;
import com.example.careerForDeveloper.data.dao.RequestDAO;
import com.example.careerForDeveloper.data.entity.Category;
import com.example.careerForDeveloper.data.entity.Project;
import com.example.careerForDeveloper.data.entity.Request;
import com.example.careerForDeveloper.data.entity.User;
import com.example.careerForDeveloper.data.repository.ProjectRepository;
import com.example.careerForDeveloper.data.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

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
    public void updateRequest(Request request){
        requestRepository.save(request);
    }

    @Override
    public List<Request> selectRequestsByProject(Project project){
        return requestRepository.findAllByProject(project);
    }

    @Override
    public Request selectRequestById(long requestId) throws BaseException {
        Optional<Request> selectedRequest = requestRepository.findById(requestId);

        if(selectedRequest.isPresent()) {
            Request request = selectedRequest.get();
            return request;
        } else {
            throw new BaseException(BaseResponseStatus.REQUEST_FAILED_GET_REQUEST_INFO);
        }
    }

    @Override
    public boolean existsByProjectAndUser(Project project, User user, String status){
        return requestRepository.existsByProjectAndUserAndStatus(project, user, status);
    }

    @Override
    public List<Request> selectRequestsByUser(User user){
        return requestRepository.findAllByUser(user);
    }
}
