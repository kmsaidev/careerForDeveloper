import './PostView.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function GetData(postId) {
    const [data, setData] = useState({});
    const [comment, setComment] = useState({});

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
                setData(res.data.result);
                setComment(res.data.result.commentList);
            }
        })
    }, [])

    const item = (
        <>
            <h2 align="center">게시글 상세정보</h2>
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

    return (<>
        <div>
            {item}
        </div>
        </>);
}

export default PostView;