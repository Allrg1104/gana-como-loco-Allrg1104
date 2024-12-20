import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/UserHome.css';

// Función para obtener datos del usuario
const fetchUserData = async () => {
  try {
    const response = await axios.get('https://gana-como-loco-allrg1104-backend.vercel.app/v1/drivers/getPartip');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Error al obtener los datos del usuario');
      return null;
    }
  } catch (error) {
    console.error('Error en la petición de usuario:', error);
    return null;
  }
};

// Función para registrar un nuevo código
const registerCode = async (code) => {
  try {
    const response = await axios.post('https://gana-como-loco-allrg1104-backend.vercel.app/v1/drivers/regCode', { codigo: code });
    return response.status === 200;
  } catch (error) {
    console.error('Error al registrar el código:', error);
    return false;
  }
};

// Función para obtener los códigos registrados
const fetchCodes = async () => {
  try {
    const response = await axios.get('https://gana-como-loco-allrg1104-backend.vercel.app/v1/drivers/mostCode');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los códigos:', error);
    return [];
  }
};

function UserHome() {
  const [user, setUser] = useState({ nombre: '', username: '', numeroCelular: '', ciudad: '' });
  const [newCode, setNewCode] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada para obtener los datos del usuario y los códigos
    const initializeData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        setUser({
          nombre: userData.nombre,
          username: userData.username,
          numeroCelular: userData.numeroCelular,
          ciudad: userData.ciudad,
        });
      }

      const codesData = await fetchCodes();
      setCodes(codesData);
    };

    initializeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCode) {
      const isSuccess = await registerCode(newCode);
      if (isSuccess) {
        setCodes([...codes, { fechaRegistro: new Date().toLocaleString(), numeroCodigo: newCode, estado: 'registrado' }]);
        setNewCode('');
      } else {
        console.error('Error al registrar el código');
      }
    }
  };

  return (
    <div className='allUserHome'>
      <div className="user-home">
        <header className="header">
          <img src="/logo.png" alt="Gana Como Loco Logo" className="logo" />
          <nav>
            <button onClick={() => navigate('/ChangePassword')}>Cambiar Contraseña</button>
            <button onClick={() => navigate('/')}>Cerrar Sesión</button>
          </nav>
        </header>

        <main className="main-content">
          <h1 className="welcome">¡Bienvenido!</h1>

          <section className="user-info">
            <h2>Información del Usuario</h2>
            <table>
              <tbody>
                <tr>
                  <td>Nombre:</td>
                  <td>{user.nombre}</td>
                </tr>
                <tr>
                  <td>Correo:</td>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <td>Número Celular:</td>
                  <td>{user.numeroCelular}</td>
                </tr>
                <tr>
                  <td>Ciudad:</td>
                  <td>{user.ciudad}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="registrar-codigo">
            <h2>Registrar Nuevo Código</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Registrar nuevo código"
                className="code-input"
              />
              <button type="submit" className="submit-btn">Enviar</button>
            </form>
          </section>

          <section className="code-list">
            <h2>Códigos Registrados</h2>
            <table>
              <thead>
                <tr>
                  <th>Fecha de Registro</th>
                  <th>Número de Código</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code, index) => (
                  <tr key={index}>
                    <td>{code.fechaRegistro}</td>
                    <td>{code.numeroCodigo}</td>
                    <td>{code.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Gana Como Loco Colombia. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default UserHome;


