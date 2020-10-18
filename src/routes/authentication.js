/*authentication tendra las ruta de sign in,sign out, log in y log out */
const {Router} = require('express');
const router = Router();
//requerimos la biblioteca entera
const passport = require('passport');
const {isLoggedIn , isNotLoggedIn} = require('../lib/auth');

//con get vamos a mostrar el formulario
router.get('/signin',isNotLoggedIn, (req,res) => {

    res.render('auth/signin');

})

/*al manejarse desde otro tipo de peticion http no va a haber conflictos
Esta ruta es la que va a usar la autenticacion*/
// router.post('/signup', (req,res) => {
//   /*este metodo toma el nombre que dimos en el archivo de settings
//   toma un objeto como segundo argumento,con successRedirect designamos a donde ir cuando sea exitoso el login,failureRedirect le mandamos al mismo formulario,pero con failureFlash mandaremos un mensaje a traves de flash*/
//     passport.authenticate('local.signup',{
//         successRedirect:'/profile',
//         failureRedirect:'/singup',
//         failureFlash: true
//     });

router.post('/signin', isNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect:'/profile',
    failureRedirect:'/singin',
    failureFlash: true
}));
    
//IMPORTANTE: podemos pasar estos datos directamente e al funcion flecha del enrutador(donde esta el req,res lo cambiamos por passport.autentictehe...)
 

//Ruta para el logIn
router.get('/login', isNotLoggedIn,(req,res) => {

    res.render('auth/login');

})

router.post('/login',isNotLoggedIn, passport.authenticate('local.login',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash: true
}));


router.get('/profile', isLoggedIn,(req,res) => {

    res.render('profile');

});

router.get('/logout', isLoggedIn,(req,res) => {

    /*Para borrar la sesion passport nos proporciona un metodo */
    req.logOut();
    
    req.flash('message','Logged Out Successfully');

    res.redirect('/signin');
})

module.exports = router;