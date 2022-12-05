import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CommonTableRow from "./table/CommonTableRow";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTable from "./table/CommonTable";


function GetRequests(requestList) {
    console.log(requestList);
    if (!requestList) {
        console.log("지원자가 없습니다.");
        return (<></>);
    }
    const requests = (Object.values(requestList)).map((request) => (
       <>
           <CommonTableRow key={request.requestId}>
               <CommonTableColumn>{request.nickname}</CommonTableColumn>
               <CommonTableColumn>{request.tech}</CommonTableColumn>
           </CommonTableRow>
       </>
    ));
    return requests;
}


function ProjectRequestView() {
    const {projectId} = useParams();
    const [data, setData] = useState('');
    const [requestList, setRequestList] = useState('');
    const [requests, setRequests] = useState('');

    useEffect(() => {
        axios.get("/project-users/request", {
            params: {
                projectId: projectId
            }
        })
            .then((res) => {
                console.log(res.data);
                setData(res.data.result);
                console.log(res.data.result.requestList);
                setRequests(GetRequests(res.data.result.requestList));
            })
    }, [])
    return (<>
        <div className="voc-header">
            <h2 align="center">지원현황</h2>
            <label>총 {data.requestCount}명의 지원자가 있습니다.</label>
        </div>
        <div className="voc-view-wrapper">
            <CommonTable headersName={['닉네임', '기술']}>
                {requests}
            </CommonTable>
        </div>
        </>)
}


export default ProjectRequestView