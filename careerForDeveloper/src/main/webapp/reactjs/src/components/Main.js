import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import StickyFooter from "./StickyFooter";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";

function Main() {

    const token = useSelector(state => state.authToken);
    console.log(token)

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
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    메인페이지
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    {'Pin a footer to the bottom of the viewport.'}
                    {'The footer will move as the main element of the page grows.'}
                </Typography>
                <Typography variant="body1">Sticky footer placeholder.</Typography>
            </Container>
            </Box>
            <StickyFooter />
        </>
    );
}

export default Main