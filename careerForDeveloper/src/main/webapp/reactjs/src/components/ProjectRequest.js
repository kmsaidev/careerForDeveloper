import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import {Divider, Stack, Typography} from "@mui/material";
import StickyFooter from "./StickyFooter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import {useDispatch} from "react-redux";

const HandleRequestSubmit = async({body, navigate}) => {
    axios.post("/project-users/request", body)
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("신청했습니다.");
                navigate(-1);
            }
            else {
                alert("이미 신청한 프로젝트입니다.");
                navigate(-1);
            }
        });
}

function ProjectRequest() {
    const [contents, setContents] = useState('');
    const {projectId} = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [data, setData] = useState('');
    const [profile, setProfile] = useState([]);
    const dispatch = useDispatch();

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
            axios.get("/project-users", {
                params: {
                    projectId: projectId
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.isSuccess) {
                        setData(res.data.result);
                        setUserId(res.data.result.userId);
                    }
                })
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
        })
    }, [])

    const body = {
        userId: userId,
        contents: contents,
        projectId: projectId
    };

    return (<>
        <NavBar />
        <Container sx={{}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    프로젝트 참여신청
                </Typography>
            </Stack>
            <Typography variant="h5" gutterBottom>
                프로젝트 정보
            </Typography>
            <Box sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 2,
                borderRadius:'16px',
                '& .MuiTextField-root': { m: 3, width: '40ch' },
                p:3,
            }}>
                <Typography variant="h3" gutterBottom sx={{mb:3}}>
                    {data.title}
                </Typography>
                <Typography variant="h5" gutterBottom sx={{mb:3}}>
                    {data.contents}
                </Typography>

            </Box>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 2,
                borderRadius:'16px',
                '& .MuiTextField-root': { m: 3, width: '40ch' },
                p:3,
            }}>
                {profile.nickname && <Typography variant="h5" gutterBottom sx={{mb:1}}>
                {profile.nickname} 의 프로필
            </Typography>}
                <Box sx={{mt:2, mb:2, m:1, alignItems: 'left'}}>
                    <Typography variant="h6" gutterBottom>
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
                    <Typography variant="h6" gutterBottom>
                        사용기술
                    </Typography>
                    <Divider />
                    {profile.tech && <Typography gutterBottom sx={{m:1}}>
                        {profile.tech}
                    </Typography>}
                    {!profile.tech && <Typography gutterBottom sx={{m:1}}>
                        등록된 사용기술이 없습니다.
                    </Typography>}
                    <Typography variant="h6" gutterBottom>
                        가능한 시간대
                    </Typography>
                    <Divider />
                    {profile.availableTime && <Typography gutterBottom sx={{m:1}}>
                        {profile.availableTime}
                    </Typography>}
                    {!profile.availableTime && <Typography gutterBottom sx={{m:1}}>
                        등록된 가능한 시간대가 없습니다.
                    </Typography>}
                </Box>
                <TextField
                    margin="normal"
                    required
                    name="contents"
                    label="신청서"
                    id="request_contents"
                    rows={10}
                    multiline
                    onChange={(e) => setContents((e.target.value))}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => HandleRequestSubmit({body, navigate})}>신청</Button>
                    <Button variant="outlined" onClick={() => navigate(-1)}>취소</Button>
                </Stack>
            </Box>
        </Container>
        <StickyFooter />

        </>);
}

export default ProjectRequest;