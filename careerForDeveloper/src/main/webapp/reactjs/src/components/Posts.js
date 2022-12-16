import React, {useEffect} from 'react';
import axios from 'axios';
import react from "react";
import { Link } from 'react-router-dom';
import CommonTable from "./table/CommonTable";
import CommonTableColumn from "./table/CommonTableColumn";
import CommonTableRow from "./table/CommonTableRow";
import PostHeader from "./PostHeader";
import NavBar from "./NavBar";

import { DataGrid } from '@mui/x-data-grid';


// export default function DataTable() {
//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 pageSize={5}
//                 rowsPerPageOptions={[5]}
//                 checkboxSelection
//             />
//         </div>
//     );
// }

function GetData() {
    

    return data;
}

function Posts() {
    const columns = [
        { field: 'id', headerName: 'NO', width: 70 },
        { field: 'title', headerName: '글제목', width: 130 },
        { field: 'nickname', headerName: '작성자', width: 130 },
        // {
        //     field: 'age',
        //     headerName: 'Age',
        //     type: 'number',
        //     width: 90,
        // },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    const [rows, setRows] = react.useState([]);

    useEffect(() => {
        axios.get("/posts")
            .then((res) => {
                console.log(res.data);
                setRows(res.data.result);
            })
    }, []);

    return (
        <>
        <NavBar />
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
        </>
    );
}

export default Posts;