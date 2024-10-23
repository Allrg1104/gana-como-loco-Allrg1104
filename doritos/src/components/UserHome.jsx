/*import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {

    /*Selector de roles*$
    if (user !== "user" || !user) {
        /*return <Navigate to="/" />*$
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');

    function goHome() {
        home("/");
    }

    async function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            fetch(`http://localhost:4000/v1/signos/${signo}`)
                .then(response => response.json())
                .then(responseData => setTextoSigno(responseData))
        }
    }

    return (
        <div className="container">
            
            <div className="Informacion del usuario">

                <div id="Bienvenida"><h3>Bienvenido!!..</h3></div>



            </div>
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            
            <select id="selectgenero" onClick={handleSelect}>
                <option value="0">Seleciona un genero</option>
                <option value="hombre">hombre</option>
                <option value="mujer">mujer</option>
                <option value="niño">niño</option>
            </select>
            
            <select id="selectSignos" onClick={handleSelect}>
                <option value="0">Seleciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Geminis">Géminis</option>
                <option value="Cancer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>
            

            <TextSigno texto={textoSigno} />
            <button id="btnHomeuh" onClick={goHome}>Home</button>
        </div>
    )
}

export default UserHome;*/

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles/UserHome.css';

function UserHome() {
  const [user, setUser] = useState({ nombre: '', username: '' });
  const [newCode, setNewCode] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating fetching user data
    setUser({ nombre: 'Alejandro Rivera', username: 'All@example.com' });

    // Simulating real-time sync with MongoDB
    const fetchCodes = () => {
      // Replace this with actual MongoDB fetch
      setCodes(['ABC123', 'DEF456', 'GHI789']);
    };

    fetchCodes();
    const interval = setInterval(fetchCodes, 5000); // Sync every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCode) {
      // Here you would typically send the new code to your backend
      setCodes([...newCode]);
      setNewCode('');
    }
  };

  return (
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
  );
}

export default UserHome;