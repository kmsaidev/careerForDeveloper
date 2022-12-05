import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import CommonTableRow from "./table/CommonTableRow";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTable from "./table/CommonTable";

const HandleConfirm = async({requestId}) => {
    axios.post("/project-users", {}, {
        params: {
            requestId: parseInt(requestId)
        }
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("승인되었습니다.");
            }
        })
}

const HandleReject = async({requestId}) => {
    axios.put("/project-users/request", {}, {
        params: {
            requestId: parseInt(requestId)
        }
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("처리되었습니다.");
            }
        })
}

function GetProjects(projects) {
    if (!projects) {
        console.log("프로젝트 목록이 없습니다.")
        return (<></>);
    }
    return ((Object.values(projects)).map((project) => (
        <>
            <CommonTableRow key={project.projectId}>
                <CommonTableColumn>{project.title}</CommonTableColumn>
                <CommonTableColumn>{project.categoryId}</CommonTableColumn>
                <CommonTableColumn>{project.status}</CommonTableColumn>
            </CommonTableRow>
        </>
    )))
}

function RequestView() {
    const {requestId} = useParams();
    const [data, setData] = useState('');
    const [projects, setProjects] = useState('');
    const [websites, setWebsites] = useState('');

    useEffect(() => {
        axios.get("/project-users/profile", {
            params: {
                requestId: parseInt(requestId)
            }
        })
            .then((res) => {
                console.log(res.data.result);
                setData(res.data.result);
                setWebsites(res.data.result.websites);
                setProjects(GetProjects(res.data.result.myProjectList));
            })
    }, [])

    return (<>
        <div className="voc-header">
            <h2 align="center">지원자 상세정보</h2>
        </div>
        <div className="voc-view-wrapper">
            <h3 align="left">참여 프로젝트</h3>
            <CommonTable headersName={['프로젝트명', '카테고리', '상태']}>
                {projects}
            </CommonTable>
        </div>
        <div className="voc-view-wrapper">
            <h3 align="left">웹사이트</h3>
            {/*<CommonTable headersName={['사이트명', '링크']}>*/}
            {/*    <CommonTableRow>*/}
            {/*        <CommonTableColumn>*/}
            {/*            {websites.websiteName}*/}
            {/*        </CommonTableColumn>*/}
            {/*        <CommonTableColumn>*/}
            {/*            {websites.website}*/}
            {/*        </CommonTableColumn>*/}
            {/*    </CommonTableRow>*/}
            {/*</CommonTable>*/}
        </div>
        <div className="voc-view-wrapper">
            {data.tech}
        </div>
        <div className="voc-view-wrapper">
            {data.availableTime}
        </div>
        <div className="voc-view-wrapper">
            {data.contents}
        </div>
        <button className="voc-view-go-list-btn" onClick={() => HandleConfirm({requestId})}>승인</button>
        <button className="voc-view-go-list-btn" onClick={() => HandleReject({requestId})}>거절</button>
    </>);
}

export default RequestView