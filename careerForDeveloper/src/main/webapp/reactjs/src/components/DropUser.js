import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_TOKEN, SET_TOKEN} from "../Store/Auth";
import {getCookieToken, removeCookieToken} from "../utils/Cookie";

function DropUser() {
    const [pwd, setPwd] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authToken);

    console.log(token);

    const dropUser = (e) => {
        if (!pwd) {
            return alert("비밀번호를 입력하세요");
        }
        if (!token.authenticated) {
            return alert("회원 정보가 없습니다.");
        }
        const res = confirm("정말 탈퇴하시겠습니까?");

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
                axios.delete("/users", {
                    data: {
                        pwd: pwd
                    }
                })
                    .then((res) => {
                        console.log(res);
                        if (res.data.isSuccess) {
                            alert("성공적으로 탈퇴했습니다.");
                            dispatch(DELETE_TOKEN());
                            removeCookieToken();
                            navigate("/");
                        } else {
                            alert(res.data.message);
                            navigate(-1);
                        }
                    });
            })
        }
    };

    return (
        <>
        <label htmlFor="password">password : </label>
        <input type="password" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
        <button onClick={dropUser}>회원탈퇴</button>
        </>
    )
}

export default DropUser;