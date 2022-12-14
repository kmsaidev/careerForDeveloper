import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCookieToken, removeCookieToken} from "../utils/Cookie";
import axios from "axios";
import {DELETE_TOKEN} from "../Store/Auth";
import {useEffect} from "react";

function Logout() {
    const { accessToken } = useSelector(state => state.authToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const refreshToken = getCookieToken();

    function logout() {
        if (!refreshToken) {
            alert("로그인 되어 있지 않습니다.");
            navigate("/");
        }
        axios.get("/auth", {
            headers: {
                "REFRESH-TOKEN": refreshToken,
            }
        }).then((res) => {
            if (!res.data.isSuccess) {
                return alert(res.data.message);
            }
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            return navigate("/");
        })
    }

    useEffect( () => {
        logout();
    }, [])

    return (<>
        </>
    );
}

export default Logout