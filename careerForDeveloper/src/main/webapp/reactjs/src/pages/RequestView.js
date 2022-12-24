import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import CommonTableRow from "../components/table/CommonTableRow";
import CommonTableColumn from "../components/table/CommonTableColumn";
import CommonTable from "../components/table/CommonTable";
import NavBar from "../components/NavBar";
import {Chip, Divider, Stack, Typography} from "@mui/material";
import StickyFooter from "../components/StickyFooter";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import {useDispatch} from "react-redux";
import Link from "@mui/material/Link";
import MyProjectCard from "../components/MyProjectCard";

const HandleConfirm = async({requestId, navigate}) => {
    axios.post("/project-users", {}, {
        params: {
            requestId: parseInt(requestId)
        }
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("승인되었습니다.");
                navigate(-2);
            }
        })
}

const HandleReject = async({requestId, navigate}) => {
    axios.put("/project-users/request", {}, {
        params: {
            requestId: parseInt(requestId)
        }
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("처리되었습니다.");
                navigate(-2);
            }
        })
}

function RequestView() {
    const {requestId} = useParams();
    const [profile, setProfile] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            axios.get("/project-users/profile", {
                params: {
                    requestId: parseInt(requestId)
                }
            })
                .then((res) => {
                    console.log(res.data.result);
                    setProfile(res.data.result);
                })
        })
    }, [])

    return (<>
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    지원자상세정보
                </Typography>
            </Stack>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:4, minHeight:'50vh'}}>
                <CssBaseline />
                {profile.partProjectList &&
                    <Typography variant="h5" gutterBottom sx={{mt:5, mb:2}}>
                        참여한 프로젝트 {profile.partProjectList.length}
                    </Typography>}
                {profile.partProjectList &&
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{mb:2}}>
                        {(Object.values(profile.partProjectList)).map((project) => (
                            <MyProjectCard project={project} category={category} />
                        ))}
                    </Grid>}
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                    웹 사이트
                </Typography>
                <Divider />
                {profile.websites && profile.websites.length > 0 && <Typography gutterBottom sx={{m:1}}>
                    <Link href={profile.websites[0].website}>
                        {profile.websites[0].websiteName}
                    </Link>
                </Typography>}
                {profile.websites && profile.websites.length == 0 && <Typography gutterBottom sx={{m:1}}>
                    등록된 웹 사이트가 없습니다.
                </Typography>}
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                    사용기술
                </Typography>
                <Divider />
                {profile.tech && <Typography gutterBottom sx={{m:1}}>
                    {profile.tech}
                </Typography>}
                {!profile.tech && <Typography gutterBottom sx={{m:1}}>
                    등록된 사용기술이 없습니다.
                </Typography>}
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                    가능한 시간대
                </Typography>
                {profile.availableTime && <Typography gutterBottom sx={{m:1}}>
                    {profile.availableTime}
                </Typography>}
                {!profile.availableTime && <Typography gutterBottom sx={{m:1}}>
                    가능한 시간대 정보가 없습니다.
                </Typography>}
                <Typography variant="h6" gutterBottom sx={{mt:2}}>
                    신청서
                </Typography>
                {profile.contents && <Typography gutterBottom sx={{m:1}}>
                    {profile.contents}
                </Typography>}
                <Grid container spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{mt:3, mb:2}}>
                    <Grid item>
                        <Button onClick={() => HandleConfirm({requestId, navigate})} variant="contained" sx={{ width: '100%' }}>
                            승인
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => HandleReject({requestId, navigate})} variant="contained" sx={{ width: '100%' }}>
                            거절
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        <StickyFooter />
    </>);
}

export default RequestView