import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import ProjectComp from "./ProjectComp";

const HandleQuestionSubmit = async({body}) => {
    console.log('update에서 호출 : ');
    console.log(body);
    axios.put('/projects', body)
        .then((res) => {
            console.log(res);
            if (!res.data.isSuccess) {
                alert(res.data.message);
            }
        });
}

function UpdateProject() {
    const {projectId} = useParams();
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [limitedMember, setLimitedMember] = useState('');
    const [techName, setTechName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [contents, setContents] = useState('');

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
        <h2 align="center">프로젝트 수정</h2>
        <ProjectComp body={body} HandleQuestionSubmit={HandleQuestionSubmit} />
    </>)
}

export default UpdateProject