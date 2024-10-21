const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/signos.routes.js');
const cors = require('cors');
const mongoose = require('mongoose');
require ('dotenv').config();


const app = express();
//const port = 4000;
const PORT = process.env.PORT || 5000;

app.use(urlencoded({ extended: true }))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);

mongoose.connect(process.env.MONGODB_URI, {
    
  })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

// Inicializar la base de datos
//initdb();