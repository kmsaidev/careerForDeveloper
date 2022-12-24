import Select from "react-select";
import DatePickerForm from "./DatePickerForm";
import React, {useEffect, useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";

function ProjectComp(props) {
    const [title, setTitle] = useState(props.body.title);
    const [categoryId, setCategoryId] = useState(props.body.categoryId);
    const [limitedMember, setLimitedMember] = useState(props.body.limitedMember);
    const [techName, setTechName] = useState(props.body.techName);
    const [startDate, setStartDate] = useState(props.body.startDate);
    const [endDate, setEndDate] = useState(props.body.endDate);
    const [contents, setContents] = useState(props.body.contents);
    const [cateOptions, setCateOptions] = useState([]);
    const [projectId, setProjectId] = useState(props.body.projectId);
    const navigate = useNavigate();
    let memberOp = [];

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

    for (let i = 0; i < 4; i++) {
        let op = {};

        op.value = (i + 1);
        op.label = (i + 1) + '명';

        memberOp.push(op);
    }

    useEffect(() => {
        axios.get("/category").
            then((res) => {
                console.log(res.data);
                setCateOptions(res.data.result);
        })
    }, [])

    return (<>
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 2,
            borderRadius:'16px',
            '& .MuiTextField-root': { m: 3, width: '40ch' },
            p:3,
        }}>
            {props.body.title &&<TextField
                margin="normal"
                required
                name="title"
                label="프로젝트명"
                id="project_title"
                defaultValue={props.body.title}
                key={props.body.title}
                onChange={(e) => setTitle((e.target.value))}
            />}
            {!props.body.title &&<TextField
                margin="normal"
                required
                name="title"
                label="프로젝트명"
                id="project_title"
                onChange={(e) => setTitle((e.target.value))}
            />}
            <Box sx={{width: '40ch'}}>
                <Select
                    onChange={(e) => setCategoryId(e.value)}
                    placeholder="카테고리를 선택하세요."
                    options={cateOptions}
                />
            </Box>
            <Box sx={{width: '40ch', mt:3}}>
                <Select
                    onChange={(e) => setLimitedMember(e.value)}
                    placeholder="인원 수를 선택하세요."
                    options={memberOp}
                />
            </Box>
            {props.body.techName && <TextField
                margin="normal"
                required
                name="tech"
                label="사용기술"
                id="project_tech"
                defaultValue={props.body.techName}
                key={props.body.techName}
                onChange={(e) => setTechName((e.target.value))}
            />}
            {!props.body.techName && <TextField
                margin="normal"
                required
                name="tech"
                label="사용기술"
                id="project_tech"
                onChange={(e) => setTechName((e.target.value))}
            />}
            <Box sx={{width: '40ch'}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        시작 날짜
                    </Grid>
                    <Grid item xs={6}>
                        종료 날짜
                    </Grid>
                    <Grid item xs={6}>
                        <DatePickerForm date={props.body.startDate} setDate={setStartDate} />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePickerForm date={props.body.endDate} setDate={setEndDate} />
                    </Grid>
                </Grid>
            </Box>
            <TextField
                margin="normal"
                required
                name="contents"
                label="프로젝트 설명"
                id="project_contents"
                rows={10}
                defaultValue={props.body.contents}
                key={props.body.contents}
                multiline
                onChange={(e) => setContents((e.target.value))}
            />
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => props.HandleQuestionSubmit({body})}>등록</Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>취소</Button>
            </Stack>
        </Box>
    </>)
}

export default ProjectComp