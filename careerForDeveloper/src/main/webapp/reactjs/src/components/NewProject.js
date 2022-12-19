import React, {useState} from "react";
import axios from "axios";
import ProjectComp from "./ProjectComp";
import NavBar from "./NavBar";
import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import StickyFooter from "./StickyFooter";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";



function NewProject() {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [limitedMember, setLimitedMember] = useState('');
    const [techName, setTechName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [contents, setContents] = useState('');
    const navigate = useNavigate();

    const HandleQuestionSubmit = async({body}) => {
        // console.log(body);
        axios.post('/projects', body
        )
            .then((res) => {
                console.log(res);
                if (!res.data.isSuccess) {
                    alert(res.data.message);
                }
                navigate("/projects/" + res.data.result);
            });
    }

    const body = {
        title: title,
        categoryId: categoryId,
        limitedMember: limitedMember,
        techName: techName,
        startDate: startDate,
        endDate: endDate,
        contents: contents
    };

    return (<>
        <NavBar />
        <Container sx={{}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    새 프로젝트
                </Typography>
            </Stack>
            <ProjectComp body={body} HandleQuestionSubmit={HandleQuestionSubmit} />
        </Container>
        <StickyFooter />
        </>)
}

export default NewProject