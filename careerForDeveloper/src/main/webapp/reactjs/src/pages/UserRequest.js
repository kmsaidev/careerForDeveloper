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
import {Card, Chip, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import StickyFooter from "../components/StickyFooter";
import CardContent from "@material-ui/core/CardContent";
import Link from "@mui/material/Link";

function UserRequest() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState([]);
    const [requests, setRequests] = useState([]);
    const [category, setCategory] = useState([]);

    const colors = [
        'primary', 'secondary', 'error', 'info', 'success'
    ];

    useEffect(() => {
        axios.get("/category").
        then((res) => {
            console.log(res.data);
            setCategory(res.data.result);
        })
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
            <MyPage profile={profile} />
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'20px', mt: 1, p:5}}>
                <CssBaseline />
                {requests &&
                    <Typography variant="h5" gutterBottom sx={{mb:2}}>
                        지원현황 {requests.length}
                    </Typography>}
                {requests &&
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {(Object.values(requests)).map((request) => (
                            <Grid item xs={12} sm={6} md={3}>
                                <Link href={`/projects/${request.projectDto.projectId}`} underline="none" color="inherit">
                                    <Card sx={{ boxShadow: 2, borderRadius:'16px', position: 'relative' }}>
                                        <CardContent sx={{p: 3}}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {request.projectDto.title}
                                            </Typography>
                                            {category && <Chip size="small" color={colors[request.projectDto.categoryId]}
                                                               label={category.find(v => v.value === request.projectDto.categoryId).label}
                                                               sx={{mb:1}}/>}
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                            // <MyProjectCard project={project} category={category} />
                        ))}
                    </Grid>}
            </Box>
        </Container>
        <StickyFooter />
    </>)
}

export default UserRequest