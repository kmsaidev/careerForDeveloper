import React from 'react';
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {useNavigate} from "react-router-dom";

function PostListComp(props) {
    const {rows, pageSize} = props;
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'NO', width: 50 },
        { field: 'title', headerName: '글제목', width: 550 },
        { field: 'commentCount', headerName: '댓글수', width: 100},
        { field: 'nickname', headerName: '작성자', width: 130 }
    ];

    const handleRowClick = (params) => {
        navigate("/posts/" + params.id);
    };

    return (
        <Box sx={{ width: '90%', alignItems:'center', p:2 }}>
            <DataGrid
                onRowClick={handleRowClick}
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[5]}
                autoHeight={true}
            />
        </Box>
    );
}

export default PostListComp