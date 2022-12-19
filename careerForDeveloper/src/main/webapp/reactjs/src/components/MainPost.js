import * as React from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Image} from "react-bootstrap";
import Link from "@mui/material/Link";

function MainPost(props) {
    const { post } = props;

    return (
        <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:4, minHeight:'50vh'}}>
            <CssBaseline />
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Typography gutterBottom>
                        제목 :
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    {post.createdAt && <Typography gutterBottom>
                        {post.createdAt.substring(0, 10)}
                    </Typography>}
                </Grid>
            </Grid>
            <Divider />
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href={`/posts/delete/${post.postId}`} variant="body2">
                        삭제
                    </Link>
                    <Link href={`/posts/update/${post.postId}`} variant="body2">
                        수정
                    </Link>
                </Grid>
            </Grid>
            <Box maxWidth="sm" sx={{mt:3}}>
                {post.fileLoc &&
                    <Image
                        src={"http://localhost:8080/image/" + post.fileLoc}
                        height="100%"
                        width="100%"
                        fit="contain" />}
            </Box>
            <Typography variant="h6" sx={{mt:2, mb:3}}>
                {post.contents}
            </Typography>
        </Box>
    );
}


export default MainPost;