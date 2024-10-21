const fs = require('fs/promises');
const path = require('path');
const CryptoJS = require('crypto-js');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Login attempt:', { email, password });
  
    try {
      const hashedPassword = CryptoJS.SHA256(password, process.env.CODE_SECRET_DATA).toString();
      const user = await db.collection('users').findOne({ email, password: hashedPassword });
  
      if (user) {
        const currentDateTime = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        await db.collection('log_login').insertOne({ email, role: user.role, date: currentDateTime });
        res.json({ success: true, message: 'Inicio de sesión exitoso', redirectTo: '/home', user: email, role: user.role });
      } else {
        res.status(400).json({ success: false, message: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    login
}