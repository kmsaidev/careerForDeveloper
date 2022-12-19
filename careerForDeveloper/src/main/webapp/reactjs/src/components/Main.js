import {useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import react, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ProjectCardDemo from "./ProjectCardDemo";
import {DataGrid} from "@mui/x-data-grid";
import {Card, Divider} from "@mui/material";

function Main() {
    const [category, setCategory] = useState([]);
    const [projects, setProjects] = useState([]);
    const token = useSelector(state => state.authToken);

    const columns = [
        { field: 'id', headerName: 'NO', width: 50 },
        { field: 'title', headerName: '글제목', width: 550 },
        { field: 'commentCount', headerName: '댓글수', width: 100},
        { field: 'nickname', headerName: '작성자', width: 130 }
    ];


    const [rows, setRows] = react.useState([]);
    const navigate = useNavigate();

    const handleRowClick = (params) => {
        navigate("/posts/" + params.id);
    };

    console.log(token)

    useEffect(() => {
        axios.get("/category").
        then((res) => {
            console.log(res.data);
            setCategory(res.data.result);
        })
        axios.get("/projects")
            .then((res) => {
                console.log(res.data.result);
                setProjects(res.data.result);
            })
        axios.get("/posts")
            .then((res) => {
                console.log(res.data);
                setRows(res.data.result.slice(0, 5));
            })
    }, []);

    return(
        <>
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2 }}>
                <Typography variant="h3" component="h1" >
                    CareerForDeveloper
                </Typography>
                <Divider />
                <Typography variant="h5" gutterBottom sx={{mt:3, mb:2}}>
                    최근 프로젝트
                </Typography>
                {projects &&
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {(Object.values(projects.slice(0, 4))).map((item) => (
                        <ProjectCardDemo project={item} category={category}/>
                    ))}
                </Grid>}
                <Typography variant="h5" gutterBottom sx={{mt:5, mb:2}}>
                    최근 게시물
                </Typography>
                <Box sx={{ width: '90%', alignItems:'center', p:2 }}>
                        <DataGrid
                            onRowClick={handleRowClick}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            autoHeight={true}
                        />
                </Box>
            </Container>
            </Box>
            <StickyFooter />
        </>
    );
}

export default Main