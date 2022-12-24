import {Divider, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import StickyFooter from "../components/StickyFooter";
import NavBar from "../components/NavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {getCookieToken} from "../utils/Cookie";
import axios from "axios";
import {SET_TOKEN} from "../Store/Auth";
import TextField from "@mui/material/TextField";

function UpdateProfile() {
    const [profile, setProfile] = useState([]);
    const [webName, setWebName] = useState();
    const [website, setWebSite] = useState();
    const [techName, setTechName] = useState();
    const [time, setTime] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const body = {
        websiteList:[{websiteName:webName, website:website}],
        tech:techName,
        availableTime:time
    };

    const HandleSubmit = async({body}) => {
        axios.put('/users/profile', body
        )
            .then((res) => {
                console.log(res);
                if (!res.data.isSuccess) {
                    return alert(res.data.message);
                }
                navigate("/users/projects");
            });
    }

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
            axios.get("/users/profile")
                .then((res) => {
                    if (!res.data.isSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log(res.data.result);
                        setProfile(res.data.result);
                    }
                })
        })
    }, [])

    return (
        <>
            <NavBar />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                    <Typography variant="h4" gutterBottom>
                        프로필 수정
                    </Typography>
                </Stack>
            </Container>
            <Box sx={{
                m: 5,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 2,
                borderRadius:'16px',
                '& .MuiTextField-root': { m: 3, width: '40ch' },
                p:4,
                mb:3
            }}>
                {profile.nickname && <Typography variant="h5" gutterBottom sx={{mb:1}}>
                    {profile.nickname} 의 프로필
                </Typography>}
                <Box sx={{mt:2, mb:2, m:1}}>
                    <Typography variant="h6" gutterBottom>
                        웹 사이트
                    </Typography>
                    <Divider />
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                    <Grid item xs={6}>
                        {profile.websites && profile.websites.length > 0 && <TextField
                            margin="normal"
                            required
                            name="webName"
                            label="웹사이트명"
                            id="profile_webName"
                            defaultValue={profile.websites[0].websiteName}
                            key={profile.websites[0].websiteName}
                            onChange={(e) => setWebName((e.target.value))}
                        />}
                        {profile.websites && profile.websites.length == 0 && <TextField
                            margin="normal"
                            required
                            name="webName"
                            label="웹사이트명"
                            id="profile_webName"
                            onChange={(e) => setWebName((e.target.value))}
                        />}
                    </Grid>
                    <Grid item xs={6}>
                        {profile.websites && profile.websites.length > 0 && <TextField
                            margin="normal"
                            required
                            name="website"
                            label="주소"
                            id="profile_website"
                            defaultValue={profile.websites[0].website}
                            key={profile.websites[0].website}
                            onChange={(e) => setWebSite((e.target.value))}
                        />}
                        {profile.websites && profile.websites.length == 0 && <TextField
                            margin="normal"
                            required
                            name="website"
                            label="주소"
                            id="profile_website"
                            onChange={(e) => setWebSite((e.target.value))}
                        />}
                    </Grid>
                </Grid>

                    <Typography variant="h6" gutterBottom>
                        사용기술
                    </Typography>
                    <Divider />
                    {profile.tech && <TextField
                        margin="normal"
                        required
                        name="techName"
                        label="사용기술"
                        id="profile_techName"
                        defaultValue={profile.tech}
                        key={profile.tech}
                        onChange={(e) => setTechName((e.target.value))}
                    />}
                    {!profile.tech && <TextField
                        margin="normal"
                        required
                        name="techName"
                        label="사용기술"
                        id="profile_techName"
                        onChange={(e) => setTechName((e.target.value))}
                    />}
                    <Typography variant="h6" gutterBottom>
                        가능한 시간대
                    </Typography>
                    <Divider />
                    {profile.availableTime && <TextField
                        margin="normal"
                        required
                        name="time"
                        label="가능한 시간대"
                        id="profile_time"
                        defaultValue={profile.availableTime}
                        key={profile.availableTime}
                        onChange={(e) => setTime((e.target.value))}
                    />}
                    {!profile.availableTime && <TextField
                        margin="normal"
                        required
                        name="time"
                        label="가능한 시간대"
                        id="profile_time"
                        onChange={(e) => setTime((e.target.value))}
                    />}
                    <Grid container justifyContent="flex-end" sx={{mb:1, p:1}}>
                            <Button variant="outlined" onClick={() => HandleSubmit({body})}>
                                수정
                            </Button>
                    </Grid>
                </Box>
            </Box>
            <StickyFooter />
        </>
    )
}

export default UpdateProfile