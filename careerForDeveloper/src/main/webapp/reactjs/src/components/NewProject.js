import {useState} from "react";
import axios from "axios";
import ProjectComp from "./ProjectComp";

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
        <h2 align="center">프로젝트 작성</h2>
        <ProjectComp body={body} HandleQuestionSubmit={HandleQuestionSubmit} />
        </>)
}

export default NewProject