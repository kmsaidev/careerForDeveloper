import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import 'bootstrap/dist/css/bootstrap.css';

function Main() {

    const token = useSelector(state => state.authToken);
    console.log(token)

    return(
        <>
            <NavBar />
            메인페이지
        </>
    );
}

export default Main