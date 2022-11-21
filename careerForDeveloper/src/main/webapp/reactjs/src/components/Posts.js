import React, {useEffect} from 'react';
import axios from 'axios';
import react from "react";
import { Link } from 'react-router-dom';
import CommonTable from "./table/CommonTable";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTableRow from "./table/CommonTableRow";
import PostHeader from "./PostHeader";

function GetData() {
    const [data, setData] = react.useState("");

    useEffect(() => {
        axios.get("/posts")
            .then((res) => {
                console.log(res.data.result);
                setData(res.data.result);
            })
    }, []);

    const item = (Object.values(data)).map((item) => (
        <CommonTableRow key={2}>
            <CommonTableColumn>{2}</CommonTableColumn>
            <CommonTableColumn>
                <Link to={`/posts/${2}`}>
                    {item.title}
                </Link>
            </CommonTableColumn>
            <CommonTableColumn>{item.nickname}</CommonTableColumn>
            <CommonTableColumn>{item.commentCount}</CommonTableColumn>
        </CommonTableRow>
    ));

    return item;
}

function Posts() {
    const item = GetData();

    return (
        <>
            <PostHeader></PostHeader>
            <CommonTable headersName={['글번호', '글제목', '작성자', '댓글수']}>
                {item}
            </CommonTable>
        </>
    );
}

export default Posts;