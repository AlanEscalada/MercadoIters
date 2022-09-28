import React, {useEffect, useState} from "react";
import PubCard from './PubCard';
import Row from 'react-bootstrap/Row';
import Button from "react-bootstrap/esm/Button";
import PubEditorModal from './PubEditorModal';

export default function PubList({mode}){
    const [publications, setPublications] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPublication,setSelectedPublication] = useState(null);

    const getPublications = () => {
      setPublications([]);
      const urls = {
          all:'http://localhost:8000/publicaciones',
          misPublicaciones: 'http://localhost:8000/publicaciones/misPublicaciones',
          favoritos: 'http://localhost:8000/favoritos'
      };
      const url = urls[mode];

      fetch(url, { credentials: 'include'})
              .then((response) => response.json())
              .then((data) => setPublications(data));
    };

    useEffect(getPublications, [mode]);

    const getCards = () => {
        const cards = publications.map((publicacion) =>
          <PubCard
            titulo = {publicacion.titulo}
            descripcion = {publicacion.descripcion}
            imagen = {publicacion.imagen}
            precio = {publicacion.precio}
            stock = {publicacion.stock}
            id = {publicacion.id}
            categoria = {publicacion.id_categoria}
            mode = {mode} 
            handleEditar={handleEditarPublicacion}
          />
        );
        return cards;
    };
    const handleNuevaPublicacion = () => {
      setSelectedPublication(null);
      setShowModal(true);
    };
    const handleEditarPublicacion = (publicationToEdit) => {
      setSelectedPublication(publicationToEdit);
      setShowModal(true);
    };
    const handleCloseEditorModal = () => {
      setShowModal(false);
    };

    return(
        <>
        {mode === 'misPublicaciones' && (
            <Button onClick={handleNuevaPublicacion}>Nueva Publicacion</Button>
        )}
        <Row className="row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mt-4" >
          {getCards()}
        </Row>

        <PubEditorModal show={showModal} 
                        handleClose={handleCloseEditorModal} 
                        selectedPublication={selectedPublication}
                        refreshList={getPublications}/>
        </>
    );
}