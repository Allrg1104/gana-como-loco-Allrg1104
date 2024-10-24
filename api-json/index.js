const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/drivers.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cors())
app.use('/v1/drivers', router);

mongoose.connect(process.env.MONGODB_URI, {
  })
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Aquí puedes añadir tus rutas y modelos

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});