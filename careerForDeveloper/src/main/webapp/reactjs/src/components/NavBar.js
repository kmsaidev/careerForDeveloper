import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {getCookieToken} from "../utils/Cookie";

function NavBar() {

    const token = getCookieToken();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">CareerForDeveloper</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/projects/category/0">프로젝트</Nav.Link>
                        <Nav.Link href="/posts">취업정보</Nav.Link>
                        {!token && <Nav.Link href="/login">로그인</Nav.Link>}
                        {token && <Nav.Link href="/logout">로그아웃</Nav.Link>}
                        {!token && <Nav.Link href="/signup">회원가입</Nav.Link>}
                        {token &&
                        <NavDropdown title="마이페이지" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/users/projects">프로젝트</NavDropdown.Item>
                            <NavDropdown.Item href="/users/posts">
                                게시글
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/users/requests">지원현황</NavDropdown.Item>
                            {/*<NavDropdown.Divider />*/}
                            {/*<NavDropdown.Item href="#action/3.4">*/}
                            {/*    Separated link*/}
                            {/*</NavDropdown.Item>*/}
                        </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar