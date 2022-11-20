import React from 'react';
import axios from 'axios';

function Posts() {
    const posts = axios.get("/posts")
        .then((res) => {
            console.log(res);
        });

    return (
        <h1>posts</h1>
    );
}

export default Posts;