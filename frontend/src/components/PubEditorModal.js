import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

export default function PubEditorModal({show, handleClose, selectedPublication, refreshList}){

    const emptyPublication = {
            title: '',
            price: '',
            description: '',
            stock:'',
            category: '',
            image: '',
        };

    const [publication, setPublication] = useState(emptyPublication);
    const [previewPubImage, setPreviewPubImage] = useState('');

    useEffect( () => {
        if(selectedPublication){
            console.log(selectedPublication);
        setPublication({
            title: selectedPublication.titulo,
            price: selectedPublication.precio,
            description: selectedPublication.descripcion,
            stock: selectedPublication.stock,
            category: selectedPublication.categoria,
            image: '',
        });
        setPreviewPubImage('http://localhost:8000/images/' + selectedPublication.imagen);
    }else{
        setPublication(emptyPublication);
    }}, [selectedPublication]);
    

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        
        const newPublication = {...publication, [name]: value};

        setPublication(newPublication);
    };
    const handlePubImageChange = (event) => {
        const newPublication = {...publication, image: event.target.files[0]};
        setPublication(newPublication);
    };
    useEffect(()=>{
        if(publication.image){
            setPreviewPubImage(URL.createObjectURL(publication.image));
        }
    }, [publication.image]);
    const handleSave = () => {
        
        let  url = 'http://localhost:8000/publicaciones';
        let metodo = 'POST';
        if(selectedPublication){console.log(selectedPublication.id);
            metodo = 'PUT';
            url += `/${selectedPublication.id}`;
        }

        const formData = new FormData();
        
        formData.append('title', publication.title);
        formData.append('price', publication.price);
        formData.append('description', publication.description);
        formData.append('stock', publication.stock);
        formData.append('category', publication.category);
        formData.append('image', publication.image);

        fetch(url, {
            method: metodo,
            body: formData,
            credentials:'include',
        }).then((response)=>response.json()).then((data) => {
            refreshList();
            handleClose();
        });
    };

    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPublication ? 'Editar' : 'Nueva'} Publicacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text"
                                  name="title" 
                                  value={publication.title} 
                                  onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="text" 
                                  name="price"
                                  value={publication.price} 
                                  onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text"  
                                  name="description" 
                                  value={publication.description}
                                  onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="text"  
                                  name="stock" 
                                  value={publication.stock}
                                  onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control as="select" 
                                  name ="category" 
                                  onChange={handleInputChange}>
                        <option value={1}>Categoria1</option>
                        <option value={2}>Categoria2</option>
                        <option value={3}>Categoria3</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <img style={{height:"20vh"}} src={previewPubImage}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control value={publication.imagen}
                                  type="file"
                                  onChange={handlePubImageChange}/>
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    );
}