const express = require('express');

const path = require('path');

const router = express.Router();

const connection = require('../connection');

router.get('/', (req, res)=>{
    const sql = `SELECT * 
                 FROM publicaciones`;
    connection.query(sql, (error, result)=>{
        if(error){
            res.json({message: 'Error al obtener las publicaciones'});
        }else{
            res.json(result);
        }
    });
}); 

router.post('/', (req, res)=>{
    let imageFileName = '';
    if(req.files){
        const imageFile = req.files.image;
        imageFileName = Date.now() + path.extname(imageFile.name);
        imageFile.mv(`./public/images/${imageFileName}`);
    };
    
    const sql = `INSERT INTO publicaciones(titulo, descripcion, precio, stock, imagen, id_usuario, id_categoria)
                 VALUES(?, ?, ?, ?, ?, ?, ?)`;

    const values = [req.body.title, 
                    req.body.description, 
                    req.body.price, 
                    req.body.stock,
                    imageFileName,  
                    req.session.user.id, 
                    req.body.category];

    connection.query(sql, values, (error, result)=>{
        if(error){
            res.json({message: 'Error al agregar la publicacion'});
        }else{
            res.json(result);
        }
    });
});

router.put('/:id',(req, res)=>{
    const id= req.params.id;

    const sql = `UPDATE publicaciones
                 SET titulo = ?, 
                     descripcion = ?, 
                     precio = ?, 
                     stock = ?, 
                     id_categoria = ?
                 WHERE id = ?`;

    const values = [req.body.title, 
                    req.body.description, 
                    req.body.price, 
                    req.body.stock,  
                    req.body.category,
                    id];

    connection.query(sql, values, (error, result)=>{
        if(error){
            res.json({message: 'Error al agregar la publicacion'});
        }else{
            res.json(result);
        }
    });
});

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    const sql = `DELETE FROM publicaciones
                 WHERE id = ${id}`;
    connection.query(sql, [id], (error, result)=>{
        if(error){
            res.json({message: 'Error al agregar la publicacion'});
        }else{
            res.json(result);
        }
    });
});

router.get('/misPublicaciones', (req, res) => {
    const sql = `SELECT * 
                 FROM publicaciones
                 WHERE id_usuario = ?`;
    connection.query(sql, [req.session.user.id], (error, result)=>{
        if(error){
            res.json({message: 'Error al obtener las misPublicaciones'});
        }else{
            res.json(result);
        }
    });

});
module.exports = router;