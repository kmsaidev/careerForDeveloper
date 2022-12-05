import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function RequestView() {
    const {requestId} = useParams();
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get("/project-users/profile", {
            params: {
                requestId: requestId
            }
        })
            .then((res) => {
                console.log(res);
            })
    }, [])

    return (<>
        </>);
}

export default RequestView