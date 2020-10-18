/*Importaciones Varias */
const express = require('express');
//nos avisa de las peticiones al server
const morgan = require('morgan'); 
//pedimos el motor de plantilla handlebars
const exphbs = require('express-handlebars');
//modulo del core para unir rutas
const path = require('path');
//modulo para mensajes-devuelve un middleware como morgan 
const flash = require('connect-flash');
/*modulo para crear sesiones.Tmb es un middleware*/
const session = require('express-session');
/*Modulo para guardar la sesion en la base de datos en vez de en el server */
//MySQLStore es una clase
const MySQLStore = require('express-mysql-session');
/*nos traemos la conexion para pasarla al constructor MySQLStore */
const {database} = require('./keys');
/*debemos requerir passport */

const passport = require('passport');

/*Inicializaciones */
const app = new express();
//esta aplicacion debe enterarse del archivo passport con los settings de la autenticacion.IMPORTANTE!
require('./lib/passport.js');

/*Settings Generales*/
app.set('port', process.env.PORT || 3000);

//Setting the view folder:node no sabe donde esta views con las vistas.IMPORTANTE debemos especificarlo
//La carpeta va como string en el segundo argumento,__dirname es otro
app.set('views',path.join(__dirname,'views'))
//Setteamos el motor de plantilla
app.engine('.hbs', exphbs({
    defaultLayout:'main', //defaultLayout es el nombre de la plantilla principal
    layoutsDir:path.join(app.get('views'),'layouts'), //debemos decir tmb donde ubicamos la carpeta layouts con esa vista main
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs', //debemos indicar que la extension será hbs(puede ser otra¿?
    //vamos a usar un archivo de la carpeta libs para funciones con handlebars.Debe configuarseEstas funciones se llaman helpers
    helpers:require('./lib/handlebars'),
}));
//Fijarse que solo lo hemos setteado, NO LO HEMOS ASIGNADO
app.set('view engine','.hbs');


/*Middlewares: son funciones que se ejecutan cada vez que una aplciacion cliente ejecuta una peticion al servidor */
//La sesion debe ir antes de flash
app.use(session({
    secret:'fatzmysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
//debemos permitir el uso de datos sencillos y de archivos json
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(passport.initialize());
//passport necesita una sesion tmb
app.use(passport.session());



/*Variables globales */
app.use((req,res,next) => {

    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    
    next();
});

/*Rutas */
app.use(require('./routes/routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/links'));

/*Archivos publicos que puede ver el navegador(imagenes,fuentes,css) */
app.use(express.static(path.join(__dirname,'public')));

/*Seccion Starting the server */
app.listen(app.get('port'),() => 
    //console.log("Server on port", app.get("port"))
    console.log(`Server on port ${app.get('port')}`)
);
