import {useState} from "react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import ConvertImage from "./utils/ConvertImage";
import axios from "axios";

const HandleQuestionSubmit = async({body}) => {
    console.log(body.categoryId);
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
    const [startDate, setStartDate] = useState("2022-11-25");
    const [endDate, setEndDate] = useState("2022-12-20");
    const [contents, setContents] = useState('');
    const cateOp = [{value:1, label:"test"}];
    let memberOp = [];

    const body = {
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

        // 시간을 00시로 나타내기 위해
        op.value = (i + 1);
        op.label = (i + 1) + '명';

        memberOp.push(op);
    }
    return (<>
        <h2 align="center">프로젝트 작성</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <label>제목</label>
                <input onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="voc-view-row">
                <label>카테고리</label>
                <Select
                    onChange={(e) => setCategoryId(e.value)}
                        placeholder="카테고리를 선택하세요."
                        options={cateOp}
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
                <input onChange={(e) => setTechName(e.target.value)}/>
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
                <input onChange={(e) => setContents(e.target.value)}/>
            </div>
            <button className="voc-view-go-list-btn" onClick={() => HandleQuestionSubmit({body})}>등록</button>
        </div>
        </>)
}

export default NewProject