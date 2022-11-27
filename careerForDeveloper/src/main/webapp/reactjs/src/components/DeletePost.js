import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Delete(postId) {
    const navigate = useNavigate();
    const res = confirm("정말 삭제하시겠습니까?");

    if (res) {
        axios.delete("/posts", {
            data: {
                postId:postId
            }
        }).then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("삭제했습니다.");
                navigate("/posts");
            }
            else {
                alert(res.data.message);
            }
        })
    }
}

function DeletePost() {
    const {postId} = useParams();
    return (<>
        {
            Delete(postId)
        }
    </>)
}

export default DeletePost