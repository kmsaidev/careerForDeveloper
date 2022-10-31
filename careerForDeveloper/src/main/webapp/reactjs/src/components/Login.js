import React from 'react';
import {Link} from 'react-router-dom';
// import { useDispatch } from "react-redux";

function Login() {
    // const dispatch = useDispatch();
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");

    const LoginFunc = (e) => {
        e.preventDefault();
        if (!id) {
            return alert("ID를 입력하세요.");
        }
        else if (!password) {
            return alert("Password를 입력하세요.");
        }
        else {
            return alert("ID = " + id);
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

