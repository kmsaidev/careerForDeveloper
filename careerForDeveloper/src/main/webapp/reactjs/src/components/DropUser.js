import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useSelector} from "react-redux";

function DropUser() {
    const [pwd, setPwd] = React.useState("");
    const navigate = useNavigate();
    const token = useSelector(state => state.authToken);

    console.log(token);

    const dropUser = (e) => {
        console.log(token);
        if (!pwd) {
            return alert("비밀번호를 입력하세요");
        }
        if (!token.authenticated) {
            return alert("회원 정보가 없습니다.");
        }
        const res = confirm("정말 탈퇴하시겠습니까?");

        if (res) {
            axios.delete("/users", {
                data: {
                    pwd: pwd
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.isSuccess) {
                        alert("성공적으로 탈퇴했습니다.");
                        navigate("/");
                    }
                    else {
                        alert(res.data.message);
                    }
                });
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