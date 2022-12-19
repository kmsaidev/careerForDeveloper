import React from 'react';
import {Divider, Stack, Typography} from "@mui/material";;

function MyPage() {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    마이페이지
                </Typography>
            </Stack>
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