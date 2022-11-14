import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { login } from "../auth/auth";

function Login() {
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const isEmail = (email) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        return emailRegex.test(email);
    };

    const LoginFunc = async (e) => {
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
            const { tokens } = await login({id, password});

            console.log(tokens);
            // axios.post("/users/login", {
            //     email: id,
            //     pwd: password,
            // })
            //     .then((res) => {
            //         console.log(res);
            //         if (res.data.isSuccess) {
            //             axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.result.accessToken;
            //             navigate("/")
            //         } else {
            //             alert(res.data.message);
            //         }
            //     });
        }
        // else {
        //     let body = {
        //         id,
        //         password
        //     };
        //
        //     axios.post("Endpoint", body)
        //         .then((res) => {
        //             console.log(res.data);
        //             if (res.data.code === 200) {
        //
        //             }
        //         })
        // }
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

