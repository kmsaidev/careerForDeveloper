import TextField from "@mui/material/TextField";
import FileUpload from "./FileUpload";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React, {useState} from "react";

function PostComp(props) {
    const [postId, setPostId] = useState(props.body.postId);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [imgData, setImgData] = useState('');

    const body = {
        postId: postId,
        title: title,
        contents: contents,
    };

    return (
        <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:2}}>
            {props.body.title && <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="title"
                label="제목"
                name="title"
                defaultValue = {props.body.title}
                key = {props.body.title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
            />}
            <FileUpload sendImgUrl={setImgData}/>
            { props.body.contents &&
                <TextField
                margin="normal"
                required
                fullWidth
                name="contents"
                label="내용"
                type="contents"
                id="contents"
                autoComplete="contents"
                defaultValue = {props.body.contents}
                key = {props.body.contents}
                multiline
                rows={10}
                onChange={(e) => setContents((e.target.value))}
            /> }
            <Button
                onClick={() => props.HandleQuestionSubmit({body, imgData})}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                작성
            </Button>
        </Box>
    )
}

export default PostComp