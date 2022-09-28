import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

export default function LoginModal({show, onHide, onLoginSuccess }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = async() => {
        const url = 'http://localhost:8000/auth';
        const loginUser = {
            email,
            password
        };
        const response = await fetch(url,{
            method:'POST',
            body: JSON.stringify(loginUser),
            headers: {'Content-Type' : 'application/json'},
            credentials: 'include',
        });
        const data = await response.json();
        if(response.status === 200){
            onLoginSuccess(data.user);
        }else{
            Swal.fire({ title: data.message, icon: 'error' });
        };
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleEmailChange}/>
                    <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={handleLogin}>Aceptar</Button>
            </Modal.Footer>
        </Modal>
    );
}