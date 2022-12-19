import './NewPost.css';
import axios from 'axios';
import React, {useEffect, useState} from "react";
import FileUpload from "./FileUpload";
import ConvertImage from "./utils/ConvertImage";
import {useNavigate, useParams} from "react-router-dom";
import NavBar from "./NavBar";
import {Stack, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import PostComp from "./PostComp";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import {useDispatch} from "react-redux";


function UpdatePost() {
    const {postId} = useParams();
    const [data, setData] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleQuestionSubmit = async({body, imgData}) => {
        const formData = new FormData();
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        console.log(imgData);
        formData.append("updatePostDto", new Blob([JSON.stringify(body)], {
            type: "application/json"
        }));
        const file = ConvertImage(imgData);
        formData.append("attachedFile", await file);
        axios.put('/posts', formData,
            {headers: headers})
            .then((res) => {
                console.log(res);
                navigate(-1);
                if (!res.data.isSuccess) {
                    alert(res.data.message);
                }
            });
    }

    useEffect(() => {
        const refreshToken = getCookieToken();
        if (!refreshToken) return;
        axios.get("/auth", {
            headers: {
                "REFRESH-TOKEN": refreshToken,
            }
        }).then((res) => {
            console.log(res.data);
            if (!res.data.isSuccess) {
                return alert(res.data.message);
            }
            axios.defaults.headers.common['X-ACCESS-TOKEN'] = res.data.result.accessToken;
            dispatch(SET_TOKEN(res.data.result.accessToken));
            axios.get("/posts/post", {
                params: {
                    postId: postId
                }
            }).then((res) => {
                if (!res.data.isSuccess) {
                    alert(res.data.message)
                } else {
                    setData(res.data.result);
                    setTitle(res.data.result.title);
                    setContents(res.data.result.contents);
                }
            })
        })
    }, [])


    const body = {
        postId: postId,
        title: title,
        contents: contents,
    };

    return (
        <>
            <NavBar />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                    <Typography variant="h4" gutterBottom>
                        게시글 작성
                    </Typography>
                </Stack>
                <PostComp body={body} HandleQuestionSubmit={HandleQuestionSubmit} />
            </Container>
        </>
    )
}

export default UpdatePost;