const express = require('express');

const router = express.Router();

const connection = require('../connection');
//checkin
router.get('/check', (req, res) => {
    if(req.session.user){
        res.json({data: {user: req.session.user.name}});
    }else{
        res.json({message: 'Usuario no ha iniciado sesion'});
    }
});

//iniciar sesion
router.post('/', (req, res) => {
    const {email, password} = req.body;
    const sql = `SELECT *
                 FROM usuarios
                 WHERE email = ? AND password = ?`;
    const values = [email, password];

    connection.query(sql,values, (error, result) => {
        if(error){
            res.status(500).json({message: 'Error al iniciar secion'});
    }else{
        if(result.length === 1){
            const user = {name: `${result[0].nombre} ${result[0].apellido}`, id: result[0].id};
            req.session.user = user;
            res.json({user: user.name});
        }else{
            res.status(400).json({message: 'Usuario y/o contraseña incorrectos'});
        }
    };});
});
//cerrar sesion
router.delete('/', (req, res) => {
    req.session.destroy((error) => {
        if(error){
            res.status(500).json({message: 'Error al cerrar la sesion'});
        }else{
            res.json({message: 'Sesion finalizada'});
        }
    });
});
module.exports = router; 