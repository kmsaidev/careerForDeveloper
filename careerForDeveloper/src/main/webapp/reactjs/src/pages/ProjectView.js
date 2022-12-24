import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import NavBar from "../components/NavBar";
import {Chip, Divider, Stack, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import StickyFooter from "../components/StickyFooter";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function projectView({data, category}) {
    const colors = [
        'primary', 'secondary', 'error', 'info', 'success'
    ];

    const item = (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'20px', mt: 1, p:5}}>
                        <CssBaseline />
                        {category && data.categoryId && <Chip color={colors[data.categoryId]}
                                                  label={category.find(v => v.value === data.categoryId).label}  sx={{mb:1}}/>}
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
                            <Grid item xs={6}>
                                <Typography variant="h3">
                                    {data.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {data.createdAt && <Typography variant="h6" gutterBottom>
                                    {data.createdAt.substring(0, 10)}
                                </Typography>}
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:4}}>
                            <Grid item xs={6}>
                                <Typography variant="h5" gutterBottom>
                                    사용기술
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" gutterBottom>
                                    진행일정
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {data.techName}
                            </Grid>
                            <Grid item xs={6}>
                                {data.startDate} - {data.endDate}
                            </Grid>
                        </Grid>
                        <Typography variant="h5" gutterBottom sx={{mt:4}}>
                            프로젝트 설명
                        </Typography>
                        <Box sx={{
                            height: 300,
                            backgroundColor: 'primary',
                            padding:2
                        }}>
                            {data.contents}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'20px', mt: 1, p:5}}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                {data.nickname && <Avatar> {data.nickname[0]} </Avatar>}
                            </Grid>
                            <Grid item xs={7}>
                                {data.nickname}
                            </Grid>
                            <Grid item xs={10}>
                                {data.introduce}
                            </Grid>
                        </Grid>
                        <Chip label = {"인원 " + data.partMember + "/" + data.limitedMember} sx={{mt:3}}>
                        </Chip>
                    </Box>
                    <Stack spacing={2} sx={{mt:3}}>
                        {data.myProject && <Link to={`/projects/delete/${data.projectId}`}>
                            <Button variant="contained" size="large" sx={{ width: '100%' }}>
                                삭제
                            </Button>
                        </Link>}
                        {data.myProject && <Link to={`/projects/update/${data.projectId}`}>
                            <Button variant="contained" size="large" sx={{ width: '100%' }}>
                                수정
                            </Button>
                        </Link>}
                        {data.myProject && <Link to={`/projects/request/view/${data.projectId}`}>
                            <Button variant="contained" size="large" sx={{ width: '100%' }}>
                                지원현황조회
                            </Button>
                        </Link>}
                        {!data.myProject && <Link to={`/projects/request/${data.projectId}`}>
                            <Button variant="contained" size="large" sx={{ width: '100%' }}>
                                지원하기
                            </Button>
                        </Link>}
                    </Stack>



                </Grid>
            </Grid>

        </>)

    return item;
}

function ProjectView() {
    const {projectId} = useParams();
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const view = projectView({data, category});
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = getCookieToken();
        if (!refreshToken) {
            alert("로그인이 필요합니다");
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
            axios.get("/projects/project", {
                params: {
                    projectId: projectId
                }
            }).then((res) => {
                console.log(res.data);
                if (!res.data.isSuccess) {
                    alert(res.data.message)
                }
                else {
                    console.log(res.data.result);
                    setData(res.data.result);
                }
            })
        })

        axios.get("/category").
        then((res) => {
            console.log(res.data);
            setCategory(res.data.result);
        });

    }, [])

    return (<>
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    프로젝트 조회
                </Typography>
            </Stack>
            {view}
        </Container>
        <StickyFooter />
    </>);

}

export default ProjectView;