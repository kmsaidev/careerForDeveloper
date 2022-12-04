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
        axios.get("/projects/category", {
            params: {
                categoryId: categoryId
            }
        })
            .then((res) => {
                console.log(res.data.result);
                setData(res.data.result);
            })
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
            <PostHeader></PostHeader>
            <CommonTable headersName={['프로젝트번호', '글제목', '작성자', '참여인원', '총인원']}>
                {item}
            </CommonTable>
        </>
    );
}

export default Projects;