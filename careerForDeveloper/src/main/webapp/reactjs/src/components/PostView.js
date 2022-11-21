import './PostView.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTableRow from "./table/CommonTableRow";
import CommonTable from "./table/CommonTable";
import NewComment from "./NewComment";

function GetComment(postId) {
    const [commentList, setCommentList] = useState({});

    useEffect(() => {
        axios.get("/posts/post", {
            params: {
                postId: postId
            }
        }).then((res) => {
            if (!res.data.isSuccess) {
                alert(res.data.message)
            }
            else {
                setCommentList(res.data.result.commentList);
            }
        })
    }, [])

    const comments = (Object.values(commentList)).map((comment) => (
            <CommonTableRow key={1}>
                <CommonTableColumn>{1}</CommonTableColumn>
                <CommonTableColumn>{comment.nickname}</CommonTableColumn>
                <CommonTableColumn>{comment.contents}</CommonTableColumn>
                <CommonTableColumn>
                    {comment.myComment && <Link to={`/comments/delete/${1}`}>삭제</Link>}
                </CommonTableColumn>
            </CommonTableRow>
        ));
    return comments;
}

function GetData(postId) {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get("/posts/post", {
            params: {
                postId: postId
            }
        }).then((res) => {
            if (!res.data.isSuccess) {
                alert(res.data.message)
            }
            else {
                console.log(res.data.result.commentList);
                setData(res.data.result);
            }
        })
    }, [])

    const item = (
        <>
            <h2 align="center">게시글 상세정보</h2>
            {data.myPost && <Link to={`/posts/delete/${data.postId}`}>삭제</Link>}
            <div className="voc-view-wrapper">
                <div className="voc-view-row">
                    <label>게시글 번호</label>
                    <label>{ data.postId }</label>
                </div>
                <div className="voc-view-row">
                    <label>제목</label>
                    <label>{ data.title }</label>
                </div>
                <div className="voc-view-row">
                    <label>작성일</label>
                    <label>{ data.createdAt }</label>
                </div>
                <div className="voc-view-row">
                    <label>내용</label>
                    <div>
                        {
                            data.contents
                        }
                    </div>
                </div>
            </div>

        </>)

    return item;
}

function PostView() {
    const {postId} = useParams();
    const item = GetData(postId);
    const comments = GetComment(postId);

    return (<>
        <div>
            {item}
        </div>
        <div className="voc-view-row">
            <CommonTable headersName={['댓글번호', '작성자', '댓글내용']}>
                {comments}
            </CommonTable>
        </div>
        <NewComment postId={postId}/>
        </>);
}

export default PostView;