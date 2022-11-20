import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { setRefreshToken } from "../utils/Cookie";
import { SET_TOKEN } from "../Store/Auth";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authToken);

    const isEmail = (email) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        return emailRegex.test(email);
    };

    const LoginFunc = (e) => {
        e.preventDefault();
        if (!id) {
            return alert("ID를 입력하세요.");
        }
        else if (!password) {
            return alert("Password를 입력하세요.");
        }
        else if (!isEmail(id)) {
            return alert("ID가 이메일이 아닙니다.");
        }
        else {
            axios.post("/users/login", {
                email: id,
                pwd: password,
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.isSuccess) {
                        axios.defaults.headers.common['X-ACCESS-TOKEN'] = res.data.result.accessToken;
                        setRefreshToken(res.data.result.refreshToken);
                        dispatch(SET_TOKEN(res.data.result.accessToken));
                        console.log(token);
                        return navigate("/");
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    };
    return (
        <>
            <h1>LoginComponent</h1>
            <form onSubmit={LoginFunc}>
                <label htmlFor="id">ID : </label>
                <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                <br />
                <label htmlFor="password">PASSWORD : </label>
                <input type="password" value={password} onChange={(e) => setPassword((e.target.value))}/>
                <br />
                <button type="submit">로그인</button>
                <br />
            </form>
            <div>
                <Link to="/signup">회원가입</Link>
            </div>
        </>
    );
}

export default Login

