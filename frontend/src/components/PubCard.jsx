import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';

function PubCard({imagen, titulo, descripcion,precio, stock, id, categoria, mode, handleEditar}){
    const handleEditarClick = () => {
        handleEditar({
            imagen,
            titulo,
            descripcion,
            precio,
            stock,
            id,
            categoria,
            });
    };
    return(
        <Col>
            <Card className="h-100">
            <Card.Img variant="top" src={`http://localhost:8000/images/${imagen}`} />
            <Card.Body>
            <Card.Title>{titulo}</Card.Title>
            <Card.Text>{descripcion}</Card.Text>
            </Card.Body>
            <Card.Footer>$ {precio}</Card.Footer>
            {mode === 'misPublicaciones' && 
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="ligth" onClick={handleEditarClick}><FontAwesomeIcon icon={faPen}/></Button>
                        <Button variant="ligth"><FontAwesomeIcon icon={faTrash}/></Button>
                    </Col>
                </Row>
            }
            </Card>
        </Col>
    );
};

export default PubCard;