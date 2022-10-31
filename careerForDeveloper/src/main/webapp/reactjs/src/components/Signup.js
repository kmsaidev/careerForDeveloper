import React from "react";

function Signup() {

    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const [nickname, setNickname] = React.useState("");

    const SignupFunc = (e) => {
        e.preventDefault();
        return alert("회원가입");
    };

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={SignupFunc}>
                <label htmlFor="id">ID : </label>
                <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                <br />
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