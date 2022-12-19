import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

function Delete({projectId, navigate}) {
    const res = confirm("정말 삭제하시겠습니까?");

    useEffect(() => {
        if (res) {
            axios.delete("/projects", {
                data: {
                    projectId:projectId
                }
            }).then((res) => {
                console.log(res);
                if (res.data.isSuccess) {
                    alert("삭제했습니다.");
                    navigate("/");
                }
                else {
                    alert(res.data.message);
                }
            })
        }
        else {
            navigate(-1);
        }
    }, []);
}

function DeleteProject() {
    const navigate = useNavigate();
    const {projectId} = useParams();
    return (<>
        {
            Delete({projectId, navigate})
        }
    </>)
}

export default DeleteProject