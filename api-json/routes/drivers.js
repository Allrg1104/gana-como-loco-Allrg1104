const express = require('express');
const router = express.Router();
const masterController = require('./controllers/masterController.js');


router
    .post('/login', masterController.loginUser)
    .post('/createUser', masterController.createUser)
    .post('/regCode', masterController.newCode)
    .get('/getPartip', masterController.getAllParticip)
    //.post('/createAdmin', masterController.createAdmin);

    module.exports = router;
