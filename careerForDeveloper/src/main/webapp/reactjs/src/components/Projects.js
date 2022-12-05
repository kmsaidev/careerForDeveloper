import react, {useEffect} from "react";
import axios from "axios";
import CommonTableRow from "./table/CommonTableRow";
import CommonTableColumn from "./table/CommonTableColumn";
import {Link, useParams} from "react-router-dom";
import PostHeader from "./PostHeader";
import CommonTable from "./table/CommonTable";
import React from "react";

function GetData(categoryId) {
    const [data, setData] = react.useState("");

    useEffect(() => {
        if (categoryId != 0) {
            axios.get("/projects/category", {
                params: {
                    categoryId: categoryId
                }
            })
                .then((res) => {
                    console.log(res.data.result);
                    setData(res.data.result);
                })
        }
        else {
            axios.get("/projects")
                .then((res) => {
                    console.log(res.data.result);
                    setData(res.data.result);
                })
        }
    }, []);

    const item = (Object.values(data)).map((item) => (
        <CommonTableRow key={item.projectId}>
            <CommonTableColumn>{item.projectId}</CommonTableColumn>
            <CommonTableColumn>
                <Link to={`/projects/${item.projectId}`}>
                    {item.title}
                </Link>
            </CommonTableColumn>
            <CommonTableColumn>{item.nickname}</CommonTableColumn>
            <CommonTableColumn>{item.partMember}</CommonTableColumn>
            <CommonTableColumn>{item.limitedMember}</CommonTableColumn>
        </CommonTableRow>
    ));

    return item;
}

function Projects() {
    const {categoryId} = useParams();
    const item = GetData(categoryId);

    return (
        <>
            <div className="voc-header">
                <h2 align="left">프로젝트</h2>
                <Link to="/projects/new">
                    <button align="right" className="voc-view-go-list-btn">
                        새 프로젝트
                    </button>
                </Link>
            </div>

            <CommonTable headersName={['프로젝트번호', '글제목', '작성자', '참여인원', '총인원']}>
                    {item}
                </CommonTable>
        </>
    );
}

export default Projects;