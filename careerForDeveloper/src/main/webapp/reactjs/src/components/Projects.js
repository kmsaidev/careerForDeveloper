import react, {useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import React from "react";
import ProjectCardDemo from "./ProjectCardDemo";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Chip, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import NavBar from "./NavBar";
import Iconify from "./iconify";
import StickyFooter from "./StickyFooter";


function Projects() {
    const {categoryId} = useParams();
    const [data, setData] = react.useState("");
    const [category, setCategory] = react.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/category").
        then((res) => {
            console.log(res.data);
            setCategory(res.data.result);
        })
        if (categoryId != 0) {
            axios.get("/projects/category", {
                params: {
                    categoryId: categoryId
                }
            })
                .then((res) => {
                    console.log(res.data.result);
                    setData(res.data.result);
                })
        }
        else {
            axios.get("/projects")
                .then((res) => {
                    console.log(res.data.result);
                    setData(res.data.result);
                })
        }
    }, []);

    function handleClick(newCategoryId) {
        console.info('You clicked the Chip.');
        navigate(`/projects/category/${newCategoryId}`);
    }

    function getColor(id) {
        console.log(id + " " + Number(categoryId));
        if (id == categoryId) {
            return "primary";
        }
        return "default";
    }

    return (
        <>
            <NavBar />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                    <Typography variant="h4" gutterBottom>
                        프로젝트 목록
                    </Typography>
                    <Link to="/projects/new">
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        새프로젝트
                    </Button>
                    </Link>

                </Stack>
                {category && <Stack direction="row" spacing={1} sx={{mt:1, mb:3}}>
                    <Chip label="All" color={getColor(0)} component="a" href="/projects/category/0" clickable />
                    {(Object.values(category)).map((cate) => (
                        <Chip label={cate.label} color={getColor(cate.value)} component="a" href={`/projects/category/${cate.value}`} clickable />
                    ))}
                </Stack>}
                <Typography variant="h6" gutterBottom sx={{mb:2}}>
                    총 {data.length}개의 프로젝트
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {(Object.values(data)).map((item) => (
                        <ProjectCardDemo project={item} category={category}/>
                    ))}
                </Grid>
            </Container>
            <StickyFooter />
        </>
    );
}

export default Projects;