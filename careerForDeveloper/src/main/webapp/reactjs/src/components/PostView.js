import './PostView.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTableRow from "./table/CommonTableRow";
import CommonTable from "./table/CommonTable";
import NewComment from "./NewComment";
import NewReply from "./NewReply";
import UpdateComment from "./UpdateComment";
import UpdateReply from "./UpdateReply";
import StickyFooter from "./StickyFooter";
import NavBar from "./NavBar";
import {ButtonGroup, Divider, Paper, Stack, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import FeaturedPost from "./MainPost";
import MainPost from "./MainPost";
import Grid from "@mui/material/Grid";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import {useDispatch} from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

function GetReplies(repliesList, setSelectedReply, selectedReply) {

    if (!repliesList) {
        console.log("대댓글이 없습니다.");
        return (<></>);
    }
    const replies = (Object.values(repliesList)).map((comment) => (
        <>
            <Grid container spacing={2} sx={{mt:0.5, mb:0.5}}>
                <Grid item xs={0.5}>
                    L
                </Grid>
                <Grid item xs={1}>
                    {comment.nickname}
                    <Divider orientation="vertical" flexItem />
                </Grid>
                <Grid item xs={7}>
                    {comment.contents}
                </Grid>
                <Grid item>
                    <ButtonGroup variant="text" aria-label="text button group">
                        {comment.myCommentAnswer && <Button onClick={() => setSelectedReply(comment.commentAnswerId)}>수정</Button>}
                        {comment.myCommentAnswer && <Link to={`/reply/delete/${comment.commentAnswerId}`}><Button>삭제</Button></Link>}
                    </ButtonGroup>
                </Grid>
            </Grid>
            <Divider />
            {selectedReply === comment.commentAnswerId && <label>댓글 수정 폼</label> }
            {selectedReply === comment.commentAnswerId && <UpdateReply commentAnswerId={comment.commentAnswerId} contents={comment.contents} />}
        </>
        ));
    return replies;
}

function GetComment(commentList) {
    const [selectedCommReply, setSelectedCommReply] = useState('');
    const [selectedCommUpdate, setSelectedCommUpdate] = useState('');
    const [selectedReply, setSelectedReply] = useState('');

    const comments = (Object.values(commentList)).map((comment) => (
        <>

            <Grid container spacing={2} sx={{mt:0.5, mb:0.5}}>
                <Grid item xs={1}>
                    {comment.nickname}
                    <Divider orientation="vertical" flexItem />

                </Grid>
                <Grid item xs={7}>
                    {comment.contents}
                </Grid>
                <Grid item>
                    <ButtonGroup variant="text" aria-label="text button group">
                        {comment.myComment && <Button onClick={() => setSelectedCommUpdate(comment.commentId)}>수정</Button>}
                        {comment.myComment && <Link to={`/comments/delete/${comment.commentId}`}><Button>삭제</Button></Link>}
                        {comment.myComment && <Button onClick={() => setSelectedCommReply(comment.commentId)}>답글</Button>}
                    </ButtonGroup>
                </Grid>
            </Grid>
            {GetReplies(comment.commentAnswerList, setSelectedReply, selectedReply)}
            <Divider />
            {selectedCommReply === comment.commentId && <NewReply commentId={comment.commentId}/>}
            {selectedCommUpdate === comment.commentId && <label>댓글 수정 폼</label> }
            {selectedCommUpdate === comment.commentId && <UpdateComment commentId={comment.commentId} contents={comment.contents} />}
        </>
    ));
    return comments;
}

function GetData(postId) {


    return {data, commentList};
}

function PostView() {
    const {postId} = useParams();
    const [data, setData] = useState({});
    const [commentList, setCommentList] = useState([]);
    const comments = GetComment(commentList);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const refreshToken = getCookieToken();
        if (!refreshToken) {
            alert("로그인이 필요합니다");
            return navigate("/login");
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
            axios.get("/posts/post", {
                params: {
                    postId: postId
                }
            }).then((res) => {
                if (!res.data.isSuccess) {
                    alert(res.data.message)
                } else {
                    console.log(res.data.result);
                    setData(res.data.result);
                    setCommentList(res.data.result.commentList);
                }
            })
        })
    }, [])

    return (<>
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    게시글
                </Typography>
            </Stack>
            <MainPost post={data} />

            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={1}>
                <Typography variant="h6" gutterBottom>
                    댓글 {commentList.length}
                </Typography>
            </Stack>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:4}}>
                <CssBaseline />
                <Stack>
                    {comments}
                </Stack>
                <NewComment postId={postId}/>
            </Box>
        </Container>
        <StickyFooter />
    </>);
}

export default PostView;