import React, {useEffect, useState} from 'react';
import {Divider, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

;

function MyPage(props) {
    const {profile} = props;

    console.log(profile);
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    마이페이지
                </Typography>
            </Stack>

            <Box sx={{
                marginTop: 8,
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
                    <Grid container justifyContent="flex-end" sx={{mb:1, p:1}}>
                        <Link href={"/users/profile/update"}>
                            <Button variant="outlined">
                                수정
                            </Button>
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <div>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                >
                    <Typography variant="h6" gutterBottom>
                        프로젝트
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        게시글
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        회원탈퇴
                    </Typography>
                </Stack>
            </div>
        </>
    );
}

export default MyPage