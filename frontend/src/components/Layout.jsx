import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import hasJWT from '../api/JWT';


const MainLayout = ({children}) => {
    return (
        <div>
            <header>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand href='#home'>AFO</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className='justify-content-end'>
                        {hasJWT()? (<Navbar.Text>
                                Signed in as: <a>{localStorage.getItem("username")}</a>
                            </Navbar.Text>):(<Navbar.Text>
                                 <a>Logged </a>
                            </Navbar.Text>)}
                            
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