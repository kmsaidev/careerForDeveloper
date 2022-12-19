import React, {useEffect, useState} from 'react';
import {getCookieToken} from "../utils/Cookie";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {SET_TOKEN} from "../Store/Auth";
import NavBar from "../components/NavBar";
import {Divider, Stack, Typography} from "@mui/material";
import StickyFooter from "../components/StickyFooter";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MyProjectCard from "../components/MyProjectCard";
import PostListComp from "../components/PostListComp";
import MyPage from "./MyPage";

function MyPosts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const refreshToken = getCookieToken();
        if (!refreshToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
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
            axios.get("/users/post")
                .then((res) => {
                    if (!res.data.isSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log("project");
                        console.log(res.data.result);
                        setPosts(res.data.result);
                    }
                })
        })
    }, [])

    return (
        <>
            <NavBar />
            <Container>
                <MyPage />
                <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'20px', mt: 1, p:5}}>
                    <Typography variant="h5" gutterBottom sx={{mb:2}}>
                        작성한 게시글 {posts.length}
                    </Typography>
                    <PostListComp rows={posts} pageSize={5} />
                </Box>
            </Container>
            <StickyFooter />
        </>
    );
}

export default MyPosts