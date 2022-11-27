import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function Delete(commentId) {
    const res = confirm("정말 삭제하시겠습니까?");
    const navigate = useNavigate();
    if (res) {
        axios.delete("/posts/comment", {
            data: {
                commentId: commentId
            }
        }).then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("삭제했습니다.");
                navigate(-1);
            }
            else {
                alert(res.data.message);
            }
        })
    }
}

function DeleteComment() {
    const {commentId} = useParams();
    return (<>
        {
            Delete(commentId)
        }
        </>)

}

export default DeleteComment