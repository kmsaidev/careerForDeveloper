import './NewPost.css';
import axios from 'axios';
import React, {useRef, useState} from "react";
import FileUpload from "./FileUpload";
import ConvertImage from "./utils/ConvertImage";
import NavBar from "./NavBar";
import {Paper, Stack, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import StickyFooter from "./StickyFooter";

function NewPost() {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [imgData, setImgData] = useState('');
    const navigate = useNavigate();


    const HandleQuestionSubmit = async({body, imgData}) => {
        const formData = new FormData();
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        console.log(imgData);
        formData.append("postDto", new Blob([JSON.stringify(body)], {
            type: "application/json"
        }));
        if (imgData) {
            const file = ConvertImage(imgData);
            formData.append("attachedFile", await file);
        }
        else {
            formData.append("attachedFile", null);
        }
        axios.post('/posts', formData,
            {headers: headers})
            .then((res) => {
                console.log(res);
                if (!res.data.isSuccess) {
                    return alert(res.data.message);
                }
                navigate("/posts/" + res.data.result);
            });
    }

    const body = {
        title: title,
        contents: contents,
    };

    return (<>
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    게시글 작성
                </Typography>
            </Stack>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:2}}>
                <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="제목"
                    name="title"
                    autoComplete="title"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <FileUpload sendImgUrl={setImgData}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="contents"
                    label="내용"
                    type="contents"
                    id="contents"
                    autoComplete="contents"
                    multiline
                    rows={10}
                    onChange={(e) => setContents((e.target.value))}
                />
                <Button
                    onClick={() => HandleQuestionSubmit({body, imgData})}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    작성
                </Button>
            </Box>
        </Container>
        <StickyFooter />
    </>)
}

export default NewPost;