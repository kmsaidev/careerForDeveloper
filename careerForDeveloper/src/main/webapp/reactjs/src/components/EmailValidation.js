import axios from "axios";
import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

function EmailValidation(props) {
    const [code, setCode] = React.useState("");

    const validateCode = (e) => {
        e.preventDefault();
        if (!code) {
            return alert("인증번호를 입력하세요.");
        }
        const params = new URLSearchParams();
        params.append('certifiedCode', code);
        console.log(code);
        axios.post("/auth", params,  {
            headers:
                {
                    "CERTIFIED-CODE": props.certified
                },
        })
            .then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    alert("인증에 성공하였습니다.");
                    props.sendEmailAuth(true);
                } else {
                    alert("인증번호가 다릅니다.");
                }
            });
    }

    return (
        <>
            <Grid item xs={12} sm={9}>
                <TextField
                    required
                    fullWidth
                    id="code"
                    label="인증번호"
                    name="code"
                    autoComplete="code"
                    onChange={(e) => setCode(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <Button
                    onClick={validateCode}
                    fullWidth
                    variant="contained"
                >
                    확인
                </Button>
            </Grid>
        </>
    )
}

export default EmailValidation;