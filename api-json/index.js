const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/drivers.js');
const cors = require('cors');
require('dotenv').config();

// Permitir solicitudes desde el frontend con opciones de CORS
const corsOptions = {
  origin: 'https://gana-como-loco-allrg1104-front.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si necesitas enviar cookies
  optionsSuccessStatus: 200
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));  // Aplica tus opciones de CORS correctamente

app.use(express.json());

app.use('/v1/drivers', router);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
