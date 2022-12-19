import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";
import Box from "@mui/material/Box";


const DatePickerForm = (props) => {
    const [startDate, setStartDate] = useState(props.date);

    const setDate = (date) => {
        setStartDate(date);
        props.setDate(dateToString(date));
    };

    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
            + '-' + date.getDate().toString().padStart(2, '0')
    };

    return (
        <>
            <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                width="100%"
                selected={startDate} onChange={(date) => setDate(date)} />
        </>
    );
};

export default DatePickerForm