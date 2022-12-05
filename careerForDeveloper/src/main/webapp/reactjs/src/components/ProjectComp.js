import Select from "react-select";
import DatePickerForm from "./DatePickerForm";
import {useEffect, useState} from "react";
import axios from "axios";

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
    console.log(props.body);
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
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <label>제목</label>
                <input defaultValue={props.body.title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="voc-view-row">
                <label>카테고리</label>
                <Select
                    onChange={(e) => setCategoryId(e.value)}
                    placeholder="카테고리를 선택하세요."
                    options={cateOptions}
                    selected={props.body.categoryId}
                />
            </div>
            <div className="voc-view-row">
                <label>인원 수</label>
                <Select
                    onChange={(e) => setLimitedMember(e.value)}
                    placeholder="인원 수를 선택하세요."
                    options={memberOp}
                />
            </div>
            <div className="voc-view-row">
                <label>사용 기술</label>
                <input defaultValue={props.body.techName} onChange={(e) => setTechName(e.target.value)}/>
            </div>
            <div className="voc-view-row">
                <label>시작 날짜</label>
                <DatePickerForm date={props.body.startDate} setDate={setStartDate} />
            </div>
            <div className="voc-view-row">
                <label>종료 날짜</label>
                <DatePickerForm date={props.body.endDate} setDate={setEndDate} />
            </div>
            <div className="voc-view-row">
                <label>내용</label>
                <input defaultValue={props.body.contents} onChange={(e) => setContents(e.target.value)}/>
            </div>
            <button className="voc-view-go-list-btn" onClick={() => props.HandleQuestionSubmit({body})}>등록</button>
        </div>
    </>)
}

export default ProjectComp