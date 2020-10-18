const express = require('express');
//de express solo queremos su modulo llamado Router
const router = express.Router();

router.get('/', (req,res)=>{
    res.render("index");
});


module.exports = router;