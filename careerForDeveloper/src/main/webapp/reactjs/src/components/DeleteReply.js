import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function Delete(commentAnswerId) {
    const res = confirm("정말 삭제하시겠습니까?");
    const navigate = useNavigate();
    if (res) {
        axios.delete("/posts/comment-answer", {
            data: {
                commentAnswerId: commentAnswerId
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

function DeleteReply() {
    const {commentAnswerId} = useParams();
    return (<>
        {
            Delete(commentAnswerId)
        }
    </>)

}

export default DeleteReply