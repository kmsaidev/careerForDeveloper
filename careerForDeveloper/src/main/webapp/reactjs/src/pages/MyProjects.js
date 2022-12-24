import CssBaseline from "@mui/material/CssBaseline";
import {Divider, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import MyProjectCard from "../components/MyProjectCard";
import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import Container from "@mui/material/Container";
import StickyFooter from "../components/StickyFooter";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import MyPage from "./MyPage";

function MyProjects() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState([]);
    const [projects, setProjects] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get("/category").
        then((res) => {
            console.log(res.data);
            setCategory(res.data.result);
        })
        const refreshToken = getCookieToken();
        if (!refreshToken) {
            alert("로그인이 필요합니다.");
            return navigate("/login");
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
            axios.get("/users/profile")
                .then((res) => {
                    if (!res.data.isSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log("profile");
                        console.log(res.data.result);
                        setProfile(res.data.result);
                    }
                })
            axios.get("/users/project")
                .then((res) => {
                    if (!res.data.isSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log("project");
                        console.log(res.data.result);
                        setProjects(res.data.result);
                    }
                })
        })
    }, [])

    return (<>
        <NavBar />
        <Container>
            <MyPage profile={profile}/>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'20px', mt: 1, p:5}}>
                <CssBaseline />
                {projects.myProjectList &&
                    <Typography variant="h5" gutterBottom sx={{mb:2}}>
                        기획한 프로젝트 {projects.myProjectList.length}
                    </Typography>}
                {projects.myProjectList &&
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {(Object.values(projects.myProjectList)).map((project) => (
                            <MyProjectCard project={project} category={category} />
                        ))}
                    </Grid>}
                {projects.partProjectList &&
                    <Typography variant="h5" gutterBottom sx={{mt:5, mb:2}}>
                        참여한 프로젝트 {projects.partProjectList.length}
                    </Typography>}
                {projects.partProjectList &&
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {(Object.values(projects.partProjectList)).map((project) => (
                            <MyProjectCard project={project} category={category} />
                        ))}
                    </Grid>}
            </Box>
        </Container>
        <StickyFooter />
    </>)
}

export default MyProjects