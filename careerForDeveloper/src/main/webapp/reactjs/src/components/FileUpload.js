import React from 'react';
import profile from '../img/profile.png';

function FileUpload(props) {
    const [imageUrl, setImageUrl] = React.useState(null);
    const imgRef = React.useRef();

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        console.log(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
            console.log("이미지주소", reader.result);
        };
    };

    const onClickFileBtn = (e) => {
        imgRef.current.click();
    };

    return (
        <React.Fragment>
            <img src={imageUrl ? imageUrl : profile} width="150"></img>
            <input
                type="file"
                ref={imgRef}
                onChange={onChangeImage}
                style={{ display: "none" }}
            ></input>
            <button
                onClick={() => {
                    onClickFileBtn();
                }}
            >
                이미지 업로드
            </button>
            <br />
        </React.Fragment>
    );
}

export default FileUpload;