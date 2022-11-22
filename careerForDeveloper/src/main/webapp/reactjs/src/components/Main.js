import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';

function Main() {

    const token = useSelector(state => state.authToken);
    console.log(token)

    return(
        <>
            <div>
                <h1>HOME</h1>
                <Link to="/logout"> 로그아웃 </Link>
                <Link to="/update"> 회원정보수정 </Link>
                <Link to="/delete"> 회원탈퇴 </Link>
                <Link to="/posts"> 글목록 </Link>
            </div>
        </>
    );
}

export default Main