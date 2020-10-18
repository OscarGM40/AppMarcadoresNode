/*Tan solo va a haber un metodo aqui.Este metodo va a
decirnos si el usuario esta logeado o no */

module.exports = {

    /*Por cada ruta vamos a procesar estos datos,asiq ue necesitamos el request,el response y el next */
    isLoggedIn(req,res,next){
        /*Al crearse el objeto request passport esta añadiendo nuevos metodos 
        solo por usarlo yo,como el boolean isAuthenticated */
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('message','Please SignIn or LogIn')
        return res.redirect('/signin');
    },

    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        req.flash('message','You are Logged In')
        return res.redirect('/profile');
    }
};