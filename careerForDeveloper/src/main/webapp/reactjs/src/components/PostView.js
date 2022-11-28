import './PostView.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTableRow from "./table/CommonTableRow";
import CommonTable from "./table/CommonTable";
import NewComment from "./NewComment";
import NewReply from "./NewReply";
import UpdateComment from "./UpdateComment";

function GetReplies(repliesList) {
    if (!repliesList) {
        console.log("대댓글이 없습니다.");
        return (<></>);
    }
    const replies = (Object.values(repliesList)).map((comment) => (
        <CommonTableRow key={comment.commentAnswerId}>
            <CommonTableColumn>L</CommonTableColumn>
            <CommonTableColumn>{comment.nickname}</CommonTableColumn>
            <CommonTableColumn>{comment.contents}</CommonTableColumn>
            <CommonTableColumn>
                {comment.myCommentAnswer && <Link to={`/reply/delete/${comment.commentAnswerId}`}>삭제</Link>}
            </CommonTableColumn>
            {/*<CommonTableColumn>*/}
            {/*    {comment.myComment && <Link to={`/comments/update/${4}`}>수정</Link>}*/}
            {/*</CommonTableColumn>*/}
        </CommonTableRow>
    ));
    return replies;
}

function GetComment(postId) {
    const [commentList, setCommentList] = useState({});
    const [selectedCommReply, setSelectedCommReply] = useState('');
    const [selectedCommUpdate, setSelectedCommUpdate] = useState('');

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
        <>
            <CommonTableRow key={comment.commentId}>
                <CommonTableColumn>{comment.commentId}</CommonTableColumn>
                <CommonTableColumn>{comment.nickname}</CommonTableColumn>
                <CommonTableColumn>{comment.contents}</CommonTableColumn>
                <CommonTableColumn>
                    {comment.myComment && <Link to={`/comments/delete/${comment.commentId}`}>삭제</Link>}
                </CommonTableColumn>
                <CommonTableColumn>
                    {comment.myComment && <button className="voc-view-go-list-btn" onClick={() => setSelectedCommUpdate(comment.commentId)}>수정</button>}
                </CommonTableColumn>
                <CommonTableColumn>
                    <button className="voc-view-go-list-btn" onClick={() => setSelectedCommReply(comment.commentId)}>답글</button>
                </CommonTableColumn>
            </CommonTableRow>
            {GetReplies(comment.commentAnswerList)}
            {selectedCommReply === comment.commentId && <NewReply commentId={comment.commentId}/>}
            {selectedCommUpdate === comment.commentId && <label>댓글 수정 폼</label> }
            {selectedCommUpdate === comment.commentId && <UpdateComment commentId={comment.commentId} contents={comment.contents} />}
        </>
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
            {data.myPost && <Link to={`/posts/${data.postId}/update`}>수정</Link>}
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