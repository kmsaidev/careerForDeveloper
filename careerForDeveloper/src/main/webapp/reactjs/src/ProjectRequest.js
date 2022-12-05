import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const HandleRequestSubmit = async({body, navigate}) => {
    axios.post("/project-users/request", body)
        .then((res) => {
            console.log(res);
            if (res.data.isSuccess) {
                alert("신청했습니다.");
                navigate(-1);
            }
        });
}

function ProjectRequest() {
    const [contents, setContents] = useState('');
    const {projectId} = useParams();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get("/project-users", {
            params: {
                projectId: projectId
            }
        })
            .then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    setData(res.data.result);
                    setUserId(res.data.result.userId);
                }
            })
    }, [])

    const body = {
        userId: userId,
        contents: contents,
        projectId: projectId
    };

    return (<>
        <h2 align="center">프로젝트 참여신청</h2>
        <div className="voc-view-wrapper">
            <div className="voc-view-row">
                <h3 align="left">프로젝트명 : {data.title}</h3>
            </div>
            <div className="voc-view-row">
                {data.contents}
            </div>
            <div className="voc-view-row">
                <h3 align="left">유저명 : {data.nickname}</h3>
            </div>
            <div className="voc-view-row">
                {data.tech}
            </div>
            <div className="voc-view-row">
                <label>추가의견</label>
                <textarea onChange={(e) => setContents(e.target.value)} />
            </div>
            <button className="voc-view-go-list-btn" onClick={() => HandleRequestSubmit({body, navigate})}>신청</button>
        </div>
        </>);
}

export default ProjectRequest;