const fs = require('fs/promises');
const mongoose = require('mongoose');

///////////////////////////////////////////Estructura de base de datos Crear usuarios////////////////////////////////////////
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
/////////////////////////////////////////////LOGIN/////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////Create User/////////////////////////////////////////////////////////////////////

const createUser = async (req, res) => {
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
};


/////////////////////////////////////////////Estructura de base de datos registrar codigo /////////////////////////////////////////////////////////////////////

const codeSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  estado: { type: String, required: true },
  user: { type: String, required: true }
});

const Codigo = mongoose.model('premios', codeSchema,'lista');

//////////////////////////////////////////Registrar Codigos////////////////////////////////////////////////

const newCode = async (req, res) => {
  const { codigo } = req.body;
  // Obtener el nombre del usuario desde req.user (asumiendo que el usuario autenticado está en req.user)
  const regsuario = req.user.username; // Asegúrate de que req.user.name contenga el nombre del usuario

  try {
    // Verificar si el código ya está registrado
    const codigoExistente = await Codigo.findOne({ codigo });

    if (codigoExistente) {
        if (codigoExistente.estado === 'libre') {
            // Cambiar el estado a 'registrado'
            codigoExistente.estado = 'registrado';

            await codigoExistente.save();
            return res.status(200).json({ mensaje: 'El código ha sido registrado exitosamente.' });
        } else if (codigoExistente.estado === 'registrado') {
            return res.status(400).json({ mensaje: 'El código ya está registrado.' });
        }
    } else {
        // Si el código no existe, mostrar un error
        return res.status(400).json({ mensaje: 'Código no válido.' });
    }
} catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el código.', error });
}};


//////////////////////////////////////////Llamar Datos del participante////////////////////////////////////////////////

const getAllParticip = async (req, res) => {
  // Corregido: Desestructuración correcta de req.body
  const { username, password } = req.body;

  try {
    // Consulta a la base de datos para buscar el usuario con username y password
    const allParticipante = await User.findOne({ username, password });
    
    if (allParticipante) {
      console.log("Consulta exitosa");
      
      // No es necesario hacer JSON.parse, ya es un objeto JavaScript
      return res.json(allParticipante);  
    } else {
      // Si no se encuentra el usuario, devolver un mensaje o un estado 404
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    // Manejo de errores, por si ocurre un problema con la consulta
    return res.status(500).json({ mensaje: 'Error en la consulta', error });
  }
};

module.exports = {
    loginUser,
    createUser,
    newCode,
    getAllParticip

}