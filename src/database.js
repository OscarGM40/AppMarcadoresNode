/*Requerimos el modulo mysql */
const mysql = require('mysql');
//ojo con el destructuring
const  { database } = require('./keys');
const { promisify } = require('util');
//el modulo mysql no acepta Promises ni async/await,solo callbacks.Usaremos {promisify} desde 'util' para cambiar esto.
const pool = mysql.createPool(database);
//este método se usa aqui porque  vamos a exportar la conexion
//Si no tendriamos que llamar a cada momento a getConnection
//segun llamemos al modulo ya estara listo con la conexion
pool.getConnection((err,connection) => {
    //vamos a recoger 3 errores comunes
    if(err){
        //Si se cae la conexion
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        //Si hay demasiadas conexiones
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABSE HAS TOO MANY CONNECTIONS');
        }
        //Si nos rechaza la conexion la BBDD al inicio,por ejemplo credenciales incorrectas
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }    

    }// fin error

if(connection) connection.release();
    console.log('DB is Connected');
    return;

});
//solo queremos usar los métodos query desde pool.Gracias a promisify podremos usar async await.Promisify no recibe la ejecucion de la funcion,solo la funcion
pool.query = promisify(pool.query);

module.exports = pool;
