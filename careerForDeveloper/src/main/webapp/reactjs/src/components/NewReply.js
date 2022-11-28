import {useState} from "react";
import axios from "axios";
import './NewPost.css';

const HandleCommentSubmit = async({body}) => {
    axios.post('/posts/comment-answer', body)
        .then((res) => {
            console.log(res)
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
            else {
                alert("답글이 작성되었습니다!");
            }
        });
}

function NewReply(props) {
    const [contents, setContents] = useState('');

    const body = {
        commentId: props.commentId,
        contents: contents
    };
    return (
        <>
            <input type="text" onChange={(e) => setContents(e.target.value)}></input>
            <button className="voc-view-go-list-btn" onClick={() => HandleCommentSubmit({body})}>등록</button>
        </>
    )
}

export default NewReply