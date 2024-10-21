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

  ////////////////////////////////////////////MONGO\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // Aquí puedes añadir tus rutas y modelos

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

  app.post('/createUser', async (req, res) => {
    const { username, password, nombre, fechaNacimiento, cedula, ciudad, numeroCelular } = req.body;
    const role = 'user';
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Usuario ya existe' });
      }
  
      const newUser = new User({
        username,
        password,
        nombre,
        fechaNacimiento,
        cedula,
        ciudad,
        numeroCelular,
        role
      });
  
      await newUser.save();
      res.json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  });

  ///////////////////////////////////////////

  const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Por favor, ingrese un correo electrónico válido'
        ]
    },
    password: {
        type: String,
        required: true
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca el usuario por correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Correo electrónico o contraseña incorrectos');
        }

        // Compara la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Correo electrónico o contraseña incorrectos');
        }

        res.send('Inicio de sesión exitoso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
    }
});

  ///////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
  