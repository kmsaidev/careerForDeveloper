import {useEffect, useState} from "react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import ConvertImage from "./utils/ConvertImage";
import axios from "axios";
import {useParams} from "react-router-dom";

const HandleQuestionSubmit = async({body}) => {
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
    const [startDate, setStartDate] = useState("2022-11-25");
    const [endDate, setEndDate] = useState("2022-12-20");
    const [contents, setContents] = useState('');
    const cateOp = [{value:1, label:"test"}];
    let memberOp = [];

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
                setStartDate(res.data.result.startDate);
                setEndDate(res.data.result.endDate);
                setContents(res.data.result.contents);
            }
        })
    })

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
    return (<>
        <h2 align="center">프로젝트 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <label>제목</label>
                <input defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="voc-view-row">
                <label>카테고리</label>
                <Select
                    onChange={(e) => setCategoryId(e.target.value)}
                    placeholder="카테고리를 선택하세요."
                    options={cateOp}
                    selected={categoryId}
                />
            </div>
            <div className="voc-view-row">
                <label>인원 수</label>
                <Select
                    onChange={(e) => setLimitedMember(e.target.value)}
                    placeholder="인원 수를 선택하세요."
                    options={memberOp}
                />
            </div>
            <div className="voc-view-row">
                <label>사용 기술</label>
                <input defaultValue={techName} onChange={(e) => setTechName(e.target.value)}/>
            </div>
            <div className="voc-view-row">
                <label>시작 날짜</label>
                <DatePicker date={startDate} setDate={setStartDate} />
            </div>
            <div className="voc-view-row">
                <label>종료 날짜</label>
                <DatePicker date={endDate} setDate={setEndDate} />
            </div>
            <div className="voc-view-row">
                <label>내용</label>
                <input defaultValue={contents} onChange={(e) => setContents(e.target.value)}/>
            </div>
            <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({body})}>등록</button>
        </div>
    </>)
}

export default UpdateProject