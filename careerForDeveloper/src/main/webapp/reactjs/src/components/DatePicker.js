import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { ko } from "date-fns/esm/locale";

const DatePicker = (props) => {
    return (
        <DatePicker selected={props.date} onChange={date => props.setDate(date)}
            locale={ko}                   // 한글로 변경
            dateFormat="yyyy.MM.dd (eee)" // 시간 포맷 변경
            showPopperArrow={false}       // 화살표 변경
            minDate={new Date()}          // 오늘 날짜 전은 선택 못하게
            customInput={		      // 날짜 뜨는 인풋 커스텀
            <Form.Control as="textarea" rows={1} style={{width:"250px"}}/>
        }/>
    );
};

export default DatePicker