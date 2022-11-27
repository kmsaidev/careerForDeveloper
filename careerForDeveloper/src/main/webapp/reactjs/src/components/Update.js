import React from "react";
import axios from "axios";
import FileUpload from "./FileUpload";
import ConvertImage from "./utils/ConvertImage";

function Update() {

    const [nickname, setNickname] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwdchk, setPwdchk] = React.useState("");
    const formData = new FormData();

    const getImgData = async (data) => {
        const file = ConvertImage(data);
        formData.append("profileImage", await file);
    }

    const UpdateFunc = (e) => {
        e.preventDefault();
        if (!nickname || !pwd || !pwdchk) {
            return alert("모든 정보를 입력해주세요.");
        }
        else {
            const userdata = {
                nickname: nickname,
                pwd: pwd
            };

            formData.append('updateUserDto', new Blob([JSON.stringify(userdata)], {
                type: "application/json"
            }));
            axios.put("/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    console.log(res);
                    if (!res.data.isSuccess) {
                        alert(res.data.message);
                    }
                });
        }
    }


    return (
        <>
            <h1>Update</h1>
            {/*<label htmlFor="email">ID : </label>*/}
            {/*<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />*/}
            <label htmlFor="nickname">nickname : </label>
            <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
            <br/>
            <label htmlFor="password">PASSWORD : </label>
            <input type="password" value={pwd} onChange={(e) => setPwd((e.target.value))}/>
            <br/>
            <label htmlFor="passwordChk">PASSWORD 확인 : </label>
            <input type="password" value={pwdchk} onChange={(e) => setPwdchk((e.target.value))}/>
            <br/>
            <FileUpload sendImgUrl={getImgData}/>
            <br />
            <button onClick={UpdateFunc}>회원 정보 수정</button>
            <br/>
        </>
    );

}

export default Update;