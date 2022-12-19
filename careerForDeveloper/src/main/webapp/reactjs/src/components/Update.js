import React, {useState} from "react";
import axios from "axios";
import FileUpload from "./FileUpload";
import ConvertImage from "./utils/ConvertImage";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StickyFooter from "./StickyFooter";

function Update() {

    const [nickname, setNickname] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwdchk, setPwdchk] = React.useState("");
    const [imgData, setImgData] = useState('');

    const body = {
        nickname: nickname,
        pwd: pwd
    };

    const UpdateFunc = async({body, imgData}) => {
        if (!nickname || !pwd || !pwdchk) {
            return alert("모든 정보를 입력해주세요.");
        }
        else {
            const formData = new FormData();
            const headers = {
                "Content-Type": "multipart/form-data",
            };
            console.log(imgData);
            formData.append("updateUserDto", new Blob([JSON.stringify(body)], {
                type: "application/json"
            }));
            if (imgData) {
                const file = ConvertImage(imgData);
                formData.append("profileImage", await file);
            }
            else {
                formData.append("profileImage" +
                    "", null);
            }
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
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    유저 정보 수정
                </Typography>
            </Stack>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:2}}>
                <FileUpload sendImgUrl={setImgData}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nickname-update"
                    label="닉네임"
                    name="nickname"
                    autoComplete="nickname"
                    onChange={(e) => setNickname(e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    rows={10}
                    onChange={(e) => setPwd((e.target.value))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="passwordChk"
                    label="비밀번호 확인"
                    type="password"
                    id="passwordChk"
                    rows={10}
                    onChange={(e) => setPwdchk((e.target.value))}
                />
                <Button
                    onClick={() => UpdateFunc({body, imgData})}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    작성
                </Button>
            </Box>
        </Container>
        <StickyFooter />
        </>
    );

}

export default Update;