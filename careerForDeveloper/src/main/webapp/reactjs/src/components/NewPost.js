import './NewPost.css';
import axios from 'axios';
import {useState} from "react";
import FileUpload from "./FileUpload";
import ConvertImage from "./utils/ConvertImage";

const HandleQuestionSubmit = async({body, imgData}) => {
    const formData = new FormData();
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    console.log(imgData);
    formData.append("postDto", new Blob([JSON.stringify(body)], {
        type: "application/json"
    }));
    const file = ConvertImage(imgData);
    formData.append("attachedFile", await file);
    axios.post('/posts', formData,
        {headers: headers})
        .then((res) => {
            console.log(res);
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
        });
}

function NewPost() {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [imgData, setImgData] = useState('');

    const body = {
        title: title,
        contents: contents,
    };

    return (<>
        <h2 align="center">게시글 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <label>제목</label>
                <input onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div className="voc-view-row">
                <label>내용</label>
                <textarea onChange={(event) => setContents(event.target.value)}></textarea>
            </div>
            <div className="voc-view-row">
                <label>첨부 파일</label>
                <FileUpload sendImgUrl={setImgData}/>
            </div>
            <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({body, imgData})}>등록</button>
        </div>
        </>)
}

export default NewPost;