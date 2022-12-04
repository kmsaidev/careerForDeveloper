import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Delete(projectId) {
    const navigate = useNavigate();
    const res = confirm("정말 삭제하시겠습니까?");

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
}

function DeleteProject() {
    const {projectId} = useParams();
    return (<>
        {
            Delete(projectId)
        }
    </>)
}

export default DeleteProject