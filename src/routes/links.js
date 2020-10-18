/*links tendra las rutas encargadas de almacenar un enlace, eliminarlo,actualizarlo y demas */
const { Router } = require('express');
const router = Router();

const pool = require('../database');
const { isLoggedIn } =require('../lib/auth');

//esta ruta respondera con la vista del formulario
//recordemos que cualquier ruta de este archivo usara /links antes.Lo cambié
router.get('/links/add', isLoggedIn,(req, res) => {

    res.render('links/add');
});

//esta ruta recibe el formulario de /links/add
router.post('/links/add',isLoggedIn,async  (req, res) => {
    const { title , url, description } = req.body;

    const newLink = {
        title,
        url,
        description,
        user_id:req.user.id
    };

await pool.query('insert into links set ?' , [newLink])

    req.flash('success','Link saved successfully');

    res.redirect('/links');

});

//en /links el usuario verá una interfaz con los marcadores
router.get('/links', isLoggedIn, async (req,res) => {

const links = await pool.query('select * from links where user_id = ?',[req.user.id]);
      console.log(links);
    /*en las ultimas versiones de javascript si la propiedad y el valor se llaman igual se puede resumir {links:links} en {links}*/
       res.render('links/list.hbs',{links:links})
});

router.get('/links/delete/:myVar', isLoggedIn,async (req,res) => {
    const {myVar} = req.params;
    await pool.query('delete from links where id=?', [myVar])
    req.flash('success','Link Removed Successfully')
    res.redirect('/links');
})

router.get('/links/edit/:myVar',isLoggedIn, async (req,res) => {
    const {myVar} = req.params;
    const links = await pool.query('select * from links where id=?', [myVar]);
    console.log(links[0]);
    res.render('links/edit.hbs',{link:links[0]})
})

router.post('/links/edit/:id', isLoggedIn, async (req,res) => {
    const { id } = req.params;
    const { title , url, description } = req.body;

    const newLink = {
        title,
        description,
        url
    };

   // console.log(newLink);
    await pool.query('update links set ? where id=?',[newLink,id]);
    req.flash('success','Link Updated Succesfully');
    res.redirect('/links');
})

module.exports = router;