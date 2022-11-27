import './NewPost.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import FileUpload from "./FileUpload";
import ConvertImage from "./utils/ConvertImage";
import {useNavigate, useParams} from "react-router-dom";

const HandleQuestionSubmit = async({body, imgData, navigate}) => {
    const formData = new FormData();
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    console.log(imgData);
    formData.append("updatePostDto", new Blob([JSON.stringify(body)], {
        type: "application/json"
    }));
    const file = ConvertImage(imgData);
    formData.append("attachedFile", await file);
    axios.put('/posts', formData,
        {headers: headers})
        .then((res) => {
            console.log(res);
            navigate(-1);
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
        });
}

function UpdatePost() {
    const {postId} = useParams();
    const [data, setData] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

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
                setTitle(res.data.result.title);
                setContents(res.data.result.contents);
            }
        })
    }, [])

    const [imgData, setImgData] = useState('');
    const navigate = useNavigate();

    const body = {
        postId: postId,
        title: title,
        contents: contents,
    };

    return (<>
        <h2 align="center">게시글 수정</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <label>제목</label>
                <input defaultValue={data.title} onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div className="voc-view-row">
                <label>내용</label>
                <textarea defaultValue={data.contents} onChange={(event) => setContents(event.target.value)}></textarea>
            </div>
            <div className="voc-view-row">
                <label>첨부 파일</label>
                <FileUpload sendImgUrl={setImgData}/>
            </div>
            <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({body, imgData, navigate})}>등록</button>
        </div>
    </>)
}

export default UpdatePost;