import React from 'react';
import profile from '../img/profile.png';
import Button from "@mui/material/Button";

function FileUpload(props) {
    const [imageUrl, setImageUrl] = React.useState(null);
    const imgRef = React.useRef();

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
            props.sendImgUrl(reader.result);
        };
    };

    const onClickFileBtn = (e) => {
        imgRef.current.click();
    };

    return (
        <React.Fragment>
            {/*<img src={imageUrl ? imageUrl : profile} width="150"></img>*/}
            <input
                type="file"
                ref={imgRef}
                onChange={onChangeImage}
                style={{ display: "none" }}
            ></input>
            <Button variant="contained" component="label"
                onClick={() => {
                    onClickFileBtn();
                }}
            >
                파일 첨부
            </Button>
            <br />
        </React.Fragment>
    );
}

export default FileUpload;