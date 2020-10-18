/* passport permite hacer la autenticacion  con redes sociales como facebook o google,pero tmb de manera lcoal en tu base de datos*/
const passport = require('passport');
// en LocalStrategy tenemos una clase
const LocalStrategy = require('passport-local').Strategy;
//
const pool = require('../database');
const helpers = require('../lib/helpers');

//-----LocalStrategy para el LOGIN O ACCESO
passport.use('local.login', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {

      console.log(req.body);

   const rows = await pool.query('select * from users where username = ?', [username])

    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success','Welcome ' + user.username + '!'))
        } else {
            done(null, false, req.flash('message','Incorrect Password'));
        }

    } else {
        return done(null, false, req.flash('message','The Username does not exists'));
    }

}));



//------LocalStrategy para el SIIGNIN o REGISTRO
//El primer argumento es como llamamos a esta autenticacion => local.signup
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    //console.log(req.body);

    const { fullname } = req.body;

    const newUser = {
        username,
        password,
        fullname
    };

    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('insert into users SET ?', [newUser]);

    //fijemonos que newUser no tiene el campo id.Debemos agregarlo,con asignar un valor ya creamos una  propiedad nueva-sabemos que es insertId por el console.log(result)
    newUser.id = result.insertId;
    //console.log(result);
    //parece que es obligatorio devolver un User-null si hay errores
    return done(null, newUser);

}));

/*Para poder pasar el objeto request a traves de esta funcion usamos el booleano a true.Asi podemos pasar mas datos */


/*Para usar correctamente passport aun nos falta usar dos middleware.Una para serializar el objeto y otra para deserializarlo .Con esto guardaremos el usuario dentro de la sesion.Fijarse en el callback 'done' de nuevo*/
passport.serializeUser((user, done) => {
    //solo con el id ya nos vale.O devuelve null o el id
    done(null, user.id);
});

//para deserializar debemos hacer una consulta a la base de datos
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('select * from users where id = ?', [id]);
    done(null, rows[0]);
})

