import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import ProjectComp from "./ProjectComp";
import NavBar from "./NavBar";
import Container from "@mui/material/Container";
import {Stack, Typography} from "@mui/material";
import StickyFooter from "./StickyFooter";



function UpdateProject() {
    const {projectId} = useParams();
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [limitedMember, setLimitedMember] = useState('');
    const [techName, setTechName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [contents, setContents] = useState('');
    const navigate = useNavigate();

    const HandleQuestionSubmit = async({body}) => {
        console.log('update에서 호출 : ');
        console.log(body);
        axios.put('/projects', body)
            .then((res) => {
                console.log(res);
                if (!res.data.isSuccess) {
                    return alert(res.data.message);
                }
                alert("수정했습니다");
                navigate(-1);
            });
    }

    useEffect(() => {
        axios.get("/projects/project", {
            params: {
                projectId: projectId
            }
        }).then((res) => {
            if (!res.data.isSuccess) {
                alert(res.data.message)
            }
            else {
                setTitle(res.data.result.title);
                setCategoryId(res.data.result.categoryId);
                setLimitedMember(res.data.result.limitedMember);
                setTechName(res.data.result.techName);
                const sDate = res.data.result.startDate.split('-');
                const eDate = res.data.result.endDate.split('-');
                startDate.setFullYear(sDate[0]);
                startDate.setMonth(sDate[1] - 1);
                startDate.setDate(sDate[2]);
                endDate.setFullYear(eDate[0]);
                endDate.setMonth(eDate[1] - 1);
                endDate.setDate(eDate[2]);
                setContents(res.data.result.contents);
            }
        })
    }, [])

    const body = {
        projectId: projectId,
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
                    프로젝트 수정
                </Typography>
            </Stack>
            <ProjectComp body={body} HandleQuestionSubmit={HandleQuestionSubmit} />
        </Container>
        <StickyFooter />
    </>)
}

export default UpdateProject