import React, {useEffect} from 'react';
import axios from 'axios';
import react from "react";
import {Link, useNavigate} from 'react-router-dom';
import NavBar from "../components/NavBar";

import { DataGrid } from '@mui/x-data-grid';
import {
    Button,
    Card,
    Container, Divider,
    Stack,
    Typography
} from "@mui/material";
import Iconify from "../components/iconify";
import StickyFooter from "../components/StickyFooter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Posts() {
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

    useEffect(() => {
        axios.get("/posts")
            .then((res) => {
                console.log(res.data);
                setRows(res.data.result);
            })
    }, []);

    return (
        <>
        <NavBar />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={3}>
                    <Typography variant="h4" gutterBottom>
                        취업정보 게시판
                    </Typography>
                </Stack>

                <Divider />

                    <Box sx={{ width: '90%', alignItems:'center', p:2 }}>
                        <Grid container justifyContent="flex-end" sx={{mb:1, p:1}}>
                            <Link to={"/posts/new"}>
                                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                                    새게시글
                                </Button>
                            </Link>
                        </Grid>
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
            <StickyFooter />
        </>
    );
}

export default Posts;