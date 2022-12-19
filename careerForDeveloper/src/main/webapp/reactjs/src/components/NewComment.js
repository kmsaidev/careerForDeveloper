import React, {useState} from "react";
import axios from "axios";
import './NewPost.css';
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const HandleCommentSubmit = async({body, navigate}) => {
    axios.post('/posts/comment', body)
        .then((res) => {
            console.log(res)
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
            else {
                alert("댓글 작성이 완료되었습니다!");
                navigate(0);
            }
    });

}

function NewComment(props) {
    const [contents, setContents] = useState('');
    const navigate = useNavigate();

    const body = {
        postId: props.postId,
        contents: contents
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contents"
                        label="댓글내용"
                        name="contents"
                        onChange={(e) => setContents(e.target.value)}
                        autoFocus
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" onClick={() => HandleCommentSubmit({body, navigate})} sx={{ width: '100%', mt:3 }}>
                        등록
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default NewComment