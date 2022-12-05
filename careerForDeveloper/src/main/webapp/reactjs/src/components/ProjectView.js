import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import CommonTable from "./table/CommonTable";
import NewComment from "./NewComment";

function GetData(projectId) {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("/projects/project", {
            params: {
                projectId: projectId
            }
        }).then((res) => {
            if (!res.data.isSuccess) {
                alert(res.data.message)
            }
            else {
                console.log(res.data.result);
                setData(res.data.result);
            }
        })
    }, [])

    const item = (
        <>
            <h2 align="center">프로젝트 상세정보</h2>
            {data.myProject && <Link to={`/projects/delete/${data.projectId}`}>삭제</Link>}
            {data.myProject && <Link to={`/projects/update/${data.projectId}`}>수정</Link>}
            <div className="voc-view-wrapper">
                <div className="voc-view-row">
                    <label>작성자</label>
                    <label>{ data.nickname }</label>
                </div>
                <div className="voc-view-row">
                    <label>제목</label>
                    <label>{ data.title }</label>
                </div>
                <div className="voc-view-row">
                    <label>카테고리</label>
                    <label>{ data.categoryId }</label>
                </div>
                <div className="voc-view-row">
                    <label>기술스택</label>
                    <label>{ data.techName }</label>
                </div>
                <div className="voc-view-row">
                    <label>인원</label>
                    <div>
                        { data.partMember } / { data.limitedMember }
                    </div>
                </div>
                <div className="voc-view-row">
                    <label>시작일</label>
                    <label>{ data.startDate }</label>
                </div>
                <div className="voc-view-row">
                    <label>종료일</label>
                    <label>{ data.endDate }</label>
                </div>
                <div className="voc-view-row">
                    <label>내용</label>
                    <label>{ data.contents }</label>
                </div>
                <Link to={`/projects/request/${projectId}`}>
                    <button className="voc-view-go-list-btn">참여신청</button>
                </Link>
            </div>

        </>)

    return item;
}

function ProjectView() {
    const {projectId} = useParams();
    const item = GetData(projectId);

    return (<>
        <div>
            {item}
        </div>
    </>);

}

export default ProjectView;