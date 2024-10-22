const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');

///////////////////////////////////////////Modelo de base de datos////////////////////////////////////////
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    cedula: { type: String, required: true },
    ciudad: { type: String, required: true },
    numeroCelular: { type: String, required: true },
    role: { type: String, default: 'user' }
  });

/////////////////////////////////////////////LOGIN/////////////////////////////////////////////////////////////////////
const User = mongoose.model('User', userSchema,'participantes');

const loginUser= async (req, res) => {
    const { username, password } = req.body;
    const role = 'user';

    try {
        const validateUser = await User.findOne({ username, password });
        if (validateUser) {
            console.log("Login exitoso para:", username);
            return res.json({ success: true, message: 'Login Success' });
        } else {
            res.status(400).json({ success: false, message: 'El usuario o contraseña no son correctas' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

module.exports = {
    loginUser
}