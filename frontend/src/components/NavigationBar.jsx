import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LoginModal from './LoginModal';
import {Link} from 'react-router-dom';

export default function NavigationBar({user, onLogin, onLogOut}){

    const [showLoginModal, setShowLoginModal] = useState(false);
    
    const handleLogin = () => {
        setShowLoginModal(true);
    };
    const handleCloseLoginModal = () =>{
        setShowLoginModal(false);
    };

    const handleLoginSucceess = (loggedUser) => {
        onLogin(loggedUser);
        handleCloseLoginModal();
    };

    return (
        <>
        <Navbar bg="light" expand="lg">
            <Link to="/">
                <Navbar.Brand>Mercado Iters</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav className="ml-auto">
                    { user ? 
                        (<>
                            <Link className="nav-link" to="/favoritos">Favoritos</Link>
                            <Link className="nav-link" to="/misPublicaciones">Mis publicaciones</Link>
                            <NavDropdown title={user} alignRight>
                                <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLogOut}>Cerrar secion</NavDropdown.Item>
                            </NavDropdown>
                        </>)
                        :
                        (<Button onClick={handleLogin}>Iniciar secion</Button>)
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <LoginModal show={showLoginModal} 
                    onHide={handleCloseLoginModal}
                    onLoginSuccess={handleLoginSucceess}/>
        </>
    )
}