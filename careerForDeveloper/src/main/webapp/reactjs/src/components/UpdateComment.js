import {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './NewPost.css';

const HandleCommentUpdate = async({body, navigate}) => {
    axios.put('/posts/comment', body)
        .then((res) => {
            console.log(res)
            if (!res.data.isSuccess) {
                alert(res.data.message);
            } else {
                alert("댓글 수정이 완료되었습니다!");
                navigate(0);
            }
        });
}

function UpdateComment(props) {
    const [contents, setContents] = useState(props.contents);
    const navigate = useNavigate();

    const body = {
        commentId: props.commentId,
        contents: contents
    };
    return (
        <>
            <div className="voc-view-wrapper">
                <input type="text" defaultValue={props.contents} onChange={(e) => setContents(e.target.value)}></input>
                <button className="voc-view-go-list-btn" onClick={() => HandleCommentUpdate({body, navigate})}>등록</button>
            </div>
        </>
    )
}

export default UpdateComment