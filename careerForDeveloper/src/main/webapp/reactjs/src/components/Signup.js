import React from "react";
import axios from "axios";
import EmailValidation from "./EmailValidation";
import '../App.css';
import {useNavigate} from "react-router-dom";

function Signup() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [certified, setCertified] = React.useState("");
    const [auth, setAuth] = React.useState(false);
    const navigate = useNavigate();

    const isEmail = (email) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        return emailRegex.test(email);
    };

    const getEmailAuth = (auth) => {
        setAuth(auth);
        if (auth) {
            setShow(false);
        }
    }

    const sendEmail = (e) => {
      e.preventDefault();
      if (!email) {
          return alert("이메일을 입력해주세요");
      }
        axios.get("/auth/email", {
            params: {
                email: email
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    setCertified(res.data.result);
                    alert("이메일을 전송했습니다.");
                    setShow(true);
                }
                else {
                    alert("이메일은 전송하지 못했습니다. \n다시 시도해주세요.");
                }
            });
    };



    const SignupFunc = (e) => {
        e.preventDefault();
        if (!email || !password || !passwordChk || !nickname) {
            return alert("모든 항목을 입력해주세요");
        }
        else if (!isEmail(email)) {
            return alert("ID가 이메일 형식이 아닙니다.");
        }
        else if (!auth) {
            return alert("이메일 인증을 완료해주세요.");
        }
        else if (password != passwordChk) {
            return alert("비밀번호와 비밀번호 확인이 다릅니다.");
        }

        axios.post("/users",{
                email: email,
                pwd: password,
                nickname: nickname
            }
        )
            .then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    alert("회원가입 되었습니다!")
                    navigate("/login");
                }
                else {
                    alert(res.data.message)
                }
            });
    };

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={SignupFunc}>
                <label htmlFor="email">ID : </label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={sendEmail}>인증번호 전송</button>
                <br />
                {show && <EmailValidation certified={certified} sendEmailAuth={getEmailAuth}/>}
                <label htmlFor="nickname">nickname : </label>
                <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                <br />
                <label htmlFor="password">PASSWORD : </label>
                <input type="password" value={password} onChange={(e) => setPassword((e.target.value))}/>
                <br />
                <label htmlFor="passwordChk">PASSWORD 확인 : </label>
                <input type="password" value={passwordChk} onChange={(e) => setPasswordChk((e.target.value))}/>
                <br />
                <button type="submit">회원가입</button>
                <br />
            </form>
        </>
    );
}

export default Signup