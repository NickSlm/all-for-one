import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import hasJWT from '../api/JWT';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const MainLayout = ({children}) => {

    const navigate = useNavigate()

    const logoutUser = async() => {
        axios.post("http://localhost:5000/logout", {
        })
        .then(function (response){
          alert(response.data.msg)
          localStorage.clear("token")
          localStorage.clear("username")
          localStorage.clear("refreshToken")
          navigate("/")
        })
      };


    return (
        <div>
            <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">AFO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/generate-image">Generate</Nav.Link>
                        <Nav.Link href="#pricing">FAQ</Nav.Link>
                    </Nav>
                    {hasJWT()? (
                        <Nav>
                            <NavDropdown title={localStorage.getItem("username")} id="collapsible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logoutUser}>
                            Logout
                        </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        ):(
                        <Nav>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </Nav>)}
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </header>
            <main>
                {children}
            </main>
            <footer>
                footer
            </footer>
        </div>
    )
};

export default MainLayout;