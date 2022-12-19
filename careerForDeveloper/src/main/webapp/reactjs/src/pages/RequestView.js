import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import CommonTableRow from "../components/table/CommonTableRow";
import CommonTableColumn from "../components/table/CommonTableColumn";
import CommonTable from "../components/table/CommonTable";
import NavBar from "../components/NavBar";
import {Chip, Stack, Typography} from "@mui/material";
import StickyFooter from "../components/StickyFooter";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const HandleConfirm = async({requestId, navigate}) => {
    axios.post("/project-users", {}, {
        params: {
            requestId: parseInt(requestId)
        }
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("승인되었습니다.");
                navigate(-1);
            }
        })
}

const HandleReject = async({requestId, navigate}) => {
    axios.put("/project-users/request", {}, {
        params: {
            requestId: parseInt(requestId)
        }
    })
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("처리되었습니다.");
                navigate(-1);
            }
        })
}

function GetProjects(projects) {
    if (!projects) {
        console.log("프로젝트 목록이 없습니다.")
        return (<></>);
    }
    return ((Object.values(projects)).map((project) => (
        <>
            <CommonTableRow key={project.projectId}>
                <CommonTableColumn>{project.title}</CommonTableColumn>
                <CommonTableColumn>{project.categoryId}</CommonTableColumn>
                <CommonTableColumn>{project.status}</CommonTableColumn>
            </CommonTableRow>
        </>
    )))
}

function RequestView() {
    const {requestId} = useParams();
    const [data, setData] = useState('');
    const [projects, setProjects] = useState('');
    const [websites, setWebsites] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/project-users/profile", {
            params: {
                requestId: parseInt(requestId)
            }
        })
            .then((res) => {
                console.log(res.data.result);
                setData(res.data.result);
                setWebsites(res.data.result.websites);
                setProjects(GetProjects(res.data.result.myProjectList));
            })
    }, [])

    return (<>
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    지원자상세정보
                </Typography>
            </Stack>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:4, height:'50vh'}}>
                <CssBaseline />
                <Typography variant="h6" gutterBottom>
                    참여 프로젝트 {projects.length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    웹사이트
                </Typography>
                {websites && <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
                    <Grid item xs={6}>
                        {websites.websiteName}
                    </Grid>
                    <Grid item xs={6}>
                        {websites.website}
                    </Grid>
                </Grid>}
                {data.techName && <Chip color='primary' label={data.techName}  sx={{mb:1}}/> }
                <Typography variant="h6" gutterBottom>
                    가능한 시간대
                </Typography>
                <Typography>
                    {data.availableTime}
                </Typography>
                <Typography>
                    {data.contents}
                </Typography>
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
                    <Grid item xs={6}>
                        <Button onClick={() => HandleConfirm({requestId, navigate})} variant="contained" sx={{ width: '100%' }}>
                            승인
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => HandleReject({requestId, navigate})} variant="contained" sx={{ width: '100%' }}>
                            거절
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
        <StickyFooter />
    </>);
}

export default RequestView