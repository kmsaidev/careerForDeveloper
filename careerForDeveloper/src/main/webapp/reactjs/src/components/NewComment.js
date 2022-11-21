import {useState} from "react";
import axios from "axios";
import './NewPost.css';

const HandleCommentSubmit = async({body}) => {
    axios.post('/posts/comment', body)
        .then((res) => {
            console.log(res)
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
            else {
                alert("댓글 작성이 완료되었습니다!");
            }
    });

}

function NewComment(props) {
    const [contents, setContents] = useState('');

    const body = {
        postId: props.postId,
        contents: contents
    };
    return (
        <>
            <div className="voc-view-wrapper">
                <input type="text" onChange={(e) => setContents(e.target.value)}></input>
                <button className="voc-view-go-list-btn" onClick={() => HandleCommentSubmit({body})}>등록</button>
            </div>
        </>
    )
}

export default NewComment