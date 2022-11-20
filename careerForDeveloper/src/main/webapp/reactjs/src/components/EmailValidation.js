import react from "react";
import axios from "axios";
import React from "react";

function EmailValidation(props) {
    const [code, setCode] = React.useState("");

    const validateCode = (e) => {
        e.preventDefault();
        if (!code) {
            return alert("인증번호를 입력하세요.");
        }
        const params = new URLSearchParams();
        params.append('certifiedCode', code);
        console.log(code);
        axios.post("/auth", params,  {
            headers:
                {
                    "CERTIFIED-CODE": props.certified
                },
        })
            .then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    alert("인증에 성공하였습니다.");
                    props.sendEmailAuth(true);
                } else {
                    alert("인증번호가 다릅니다.");
                }
            });
    }

    return (
        <>
            <label htmlFor="code">인증번호:</label>
            <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={validateCode}>인증</button>
            <br />
        </>
    )
}

export default EmailValidation;