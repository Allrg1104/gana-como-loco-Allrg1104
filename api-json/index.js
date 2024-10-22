const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/signos.js');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cors())
app.use('/v1/signos', router);



mongoose.connect(process.env.MONGODB_URI, {
  })
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Aquí puedes añadir tus rutas y modelos
/*
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

const User = mongoose.model('User', userSchema,'participantes');

app.post('/loginUser', async (req, res) => {
  const { username,password } = req.body;
  const role = 'user';
  
  try {
      const validateUser = await User.findOne({ username, password });
     if (validateUser) {
        console.log("Login exitoso para:", username);
        return res.json({ success: true, message: 'Login Success' });
      }
      else{
      res.status(400).json({ success: false, message: 'El usuario o contraseña no son correctas' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  });*/



app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});