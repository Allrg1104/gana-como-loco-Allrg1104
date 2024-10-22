const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
const axios = require('axios');

router
    .post('/login', signoController.loginUser)
    //.post('/change-password', signoController.changePassword)
    //.post('/createUser', signoController.createUser)
    //.post('/createAdmin', signoController.createAdmin);




module.exports = router;
