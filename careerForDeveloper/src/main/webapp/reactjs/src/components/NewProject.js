import React, {useState} from "react";
import axios from "axios";
import ProjectComp from "./ProjectComp";
import NavBar from "./NavBar";
import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import StickyFooter from "./StickyFooter";
import Container from "@mui/material/Container";

const HandleQuestionSubmit = async({body}) => {
    // console.log(body);
    axios.post('/projects', body
        )
        .then((res) => {
            console.log(res);
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
        });
}

function NewProject() {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [limitedMember, setLimitedMember] = useState('');
    const [techName, setTechName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [contents, setContents] = useState('');

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
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
                <Typography variant="h4" gutterBottom>
                    새 프로젝트
                </Typography>
            </Stack>
            <Box sx={{ boxShadow: 2, borderColor: 'grey.500', borderRadius:'16px', mt: 1, p:2}}>
                <ProjectComp body={body} HandleQuestionSubmit={HandleQuestionSubmit} />
            </Box>
        </Container>
        <StickyFooter />
        </>)
}

export default NewProject