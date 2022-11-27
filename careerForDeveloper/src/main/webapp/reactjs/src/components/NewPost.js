import './NewPost.css';
import axios from 'axios';
import {useState} from "react";

const HandleQuestionSubmit = async({body}) => {
    const formData = new FormData();
    const headers = {
        "Content-Type": "multipart/form-data",
    };

    formData.append("postDto", new Blob([JSON.stringify(body)], {
        type: "application/json"
    }));
    formData.append('attachedFile', new Blob([JSON.stringify("null")], {
        type: "application/json"
    }));
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

    const body = {
        title: title,
        contents: contents
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
            <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({body})}>등록</button>
        </div>
        </>)
}

export default NewPost;