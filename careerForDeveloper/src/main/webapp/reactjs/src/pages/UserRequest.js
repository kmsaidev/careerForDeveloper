import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import NavBar from "../components/NavBar";
import Container from "@mui/material/Container";
import MyPage from "./MyPage";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import MyProjectCard from "../components/MyProjectCard";
import StickyFooter from "../components/StickyFooter";

function UserRequest() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);

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

            axios.get("/users/request")
                .then((res) => {
                    if (!res.data.isSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log(res.data.result);
                        setRequests(res.data.result);
                    }
                })
        })

    }, [])

    return (<>
        <NavBar />
        <Container>
            <MyPage />
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'20px', mt: 1, p:5}}>
                <CssBaseline />
                {requests &&
                    <Typography variant="h5" gutterBottom sx={{mb:2}}>
                        지원현황 {requests.length}
                    </Typography>}
                {/*{projects.myProjectList &&*/}
                {/*    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>*/}
                {/*        {(Object.values(projects.myProjectList)).map((project) => (*/}
                {/*            <MyProjectCard project={project} category={category} />*/}
                {/*        ))}*/}
                {/*    </Grid>}*/}
                {/*{projects.partProjectList &&*/}
                {/*    <Typography variant="h5" gutterBottom sx={{mt:5, mb:2}}>*/}
                {/*        참여한 프로젝트 {projects.partProjectList.length}*/}
                {/*    </Typography>}*/}
                {/*{projects.partProjectList &&*/}
                {/*    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>*/}
                {/*        {(Object.values(projects.partProjectList)).map((project) => (*/}
                {/*            <MyProjectCard project={project} category={category} />*/}
                {/*        ))}*/}
                {/*    </Grid>}*/}
            </Box>
        </Container>
        <StickyFooter />
    </>)
}

export default UserRequest