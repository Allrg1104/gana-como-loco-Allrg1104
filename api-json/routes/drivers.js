const express = require('express');
const router = express.Router();
const masterController = require('./controllers/masterController.js');


router
    .post('/login', masterController.loginUser)
    .post('/createUser', masterController.createUser)
    //.post('/change-password', masterController.changePassword)
    //.post('/createAdmin', masterController.createAdmin);

    module.exports = router;
