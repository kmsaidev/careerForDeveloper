import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CommonTableRow from "./table/CommonTableRow";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTable from "./table/CommonTable";
import NavBar from "./NavBar";
import {Stack, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import StickyFooter from "./StickyFooter";
import * as PropTypes from "prop-types";
import ProjectRequestCard from "./ProjectReqeustCard";
import Grid from "@mui/material/Grid";

function GetRequests(requestList) {
    console.log(requestList);
    if (!requestList) {
        console.log("지원자가 없습니다.");
        return (<></>);
    }
    const requests = (<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {(Object.values(requestList)).map((request) => (
       <>
           {/*<CommonTableRow key={request.requestId}>*/}
           {/*    <CommonTableColumn>*/}
           {/*        <Link to={`/request/view/${request.requestId}`}>*/}
           {/*            {request.nickname}*/}
           {/*        </Link>*/}
           {/*    </CommonTableColumn>*/}
           {/*    <CommonTableColumn>{request.tech}</CommonTableColumn>*/}
           {/*</CommonTableRow>*/}
            <ProjectRequestCard request={request} />
       </>))}
        </Grid>
    );
    return requests;
}


function ProjectRequestView() {
    const {projectId} = useParams();
    const [data, setData] = useState('');
    const [requestList, setRequestList] = useState('');
    const [requests, setRequests] = useState('');

    useEffect(() => {
        axios.get("/project-users/request", {
            params: {
                projectId: projectId
            }
        })
            .then((res) => {
                console.log(res.data);
                setData(res.data.result);
                console.log(res.data.result.requestList);
                setRequests(GetRequests(res.data.result.requestList));
            })
    }, [])
    return (<>
        <NavBar />
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={1}>
                <Typography variant="h4" gutterBottom>
                    지원현황
                </Typography>
            </Stack>
            <Typography sx={{mb:2}}>
                총 {data.requestCount}명의 지원자가 있습니다.
            </Typography>
            {requests}
        </Container>
        <StickyFooter />
        </>)
}


export default ProjectRequestView