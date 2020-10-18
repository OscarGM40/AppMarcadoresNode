//lo primero deberemos requerir bryptjs
const bcrypt = require('bcryptjs');
//creamos un objeto vacio
const helpers = {};

/*Método para encriptar la contraseña en el signup.
Tomará como argumentos una contraseña */
helpers.encryptPassword = async (password) => {
    // El metodo genSalt genera un hash.Cuanto mas alto el numero mas seguro el cifrado.10 es algo comun
    const salt = await bcrypt.genSalt(10)
    //el metodo hash recibe la password y la sal
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

//Metodo para desencriptar(el nombre el que queramos).Lo usaremos en el login
//Recibira la contraseña que insertamos en el formulario login y la contraseña guardada
helpers.matchPassword = async (password, savedPassword) => {
    //el metodo compara dos objetos,la contraseña guardada y la que proporcionamos
    try {
       return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
}

module.exports = helpers;