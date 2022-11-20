import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCookieToken} from "../utils/Cookie";
import axios from "axios";

function Logout() {
    const { accessToken } = useSelector(state => state.authToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const refreshToken = getCookieToken();

    function logout() {
        if (!refreshToken) {
            return alert("refresh token이 존재하지 않습니다.");
        }
        axios.get("/auth", {
            headers: {
                "REFRESTH-TOKEN": refreshToken,
            }
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        logout()
    );
}

export default Logout