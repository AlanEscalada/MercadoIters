const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mercadoiters',
});

connection.connect((error)=>{
    if(error){
        console.log("Error al conectar a la db");
    }else{
        console.log("Conectado a la bd");
    }
});

module.exports = connection;