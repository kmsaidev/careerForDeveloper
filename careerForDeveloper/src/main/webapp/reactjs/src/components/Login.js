import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { setRefreshToken } from "../utils/Cookie";
import { SET_TOKEN } from "../Store/Auth";
import { useDispatch, useSelector } from "react-redux";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "./NavBar";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                CareerForDeveloper
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


function Login() {
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state => state.authToken);

    const isEmail = (email) => {
        const emailRegex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

        return emailRegex.test(email);
    };

    const LoginFunc = (e) => {
        e.preventDefault();
        if (!id) {
            return alert("ID를 입력하세요.");
        }
        else if (!password) {
            return alert("Password를 입력하세요.");
        }
        else if (!isEmail(id)) {
            return alert("ID가 이메일이 아닙니다.");
        }
        else {
            axios.post("/users/login", {
                email: id,
                pwd: password,
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.isSuccess) {
                        axios.defaults.headers.common['X-ACCESS-TOKEN'] = res.data.result.accessToken;
                        setRefreshToken(res.data.result.refreshToken);
                        dispatch(SET_TOKEN(res.data.result.accessToken));
                        return navigate("/");
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    };
    return (
        <>
            <NavBar />
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={LoginFunc} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setId(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword((e.target.value))}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            로그인
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"계정이 없으신가요? 회원가입"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
        </>
    );
}

export default Login

