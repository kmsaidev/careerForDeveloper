import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getCookieToken} from "../utils/Cookie";
import {SET_TOKEN} from "../Store/Auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function UserRequest() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const refreshToken = getCookieToken();
        if (!refreshToken) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
        axios.get("/auth", {
            headers: {
                "REFRESH-TOKEN": refreshToken,
            }
        }).then((res) => {
            console.log(res.data);
            if (!res.data.isSuccess) {
                return alert(res.data.message);
            }
            axios.defaults.headers.common['X-ACCESS-TOKEN'] = res.data.result.accessToken;
            dispatch(SET_TOKEN(res.data.result.accessToken));

            axios.get("/project-users/request")
                .then((res) => {
                    if (!res.data.isSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log(res.data.result);
                        setRequests(res.data.result);
                    }
                })
        })

    }, [])
}

export default UserRequest