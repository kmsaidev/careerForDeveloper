import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import {useDispatch} from "react-redux";

function Delete(postId) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const res = confirm("정말 삭제하시겠습니까?");

    if (res) {
        const refreshToken = getCookieToken();
        if (!refreshToken) return;
        axios.get("/auth", {
            headers: {
                "REFRESH-TOKEN": refreshToken,
            }
        }).then((res) => {
            console.log(res.data);
            if (!res.data.isSuccess) {
                return alert(res.data.message);
            }
            axios.defaults.headers.common['X-ACCESS-TOKEN'] = res.data.result.accessToken;
            dispatch(SET_TOKEN(res.data.result.accessToken));
            axios.delete("/posts", {
                data: {
                    postId: postId
                }
            }).then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    alert("삭제했습니다.");
                    navigate("/posts");
                } else {
                    alert(res.data.message);
                    navigate(-1);
                }
            })
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