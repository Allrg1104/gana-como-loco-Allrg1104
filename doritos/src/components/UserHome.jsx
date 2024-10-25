/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/UserHome.css';

function UserHome() {
  const [user, setUser] = useState({ nombre: '', username: '' });
  const [newCode, setNewCode] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener datos del usuario y códigos registrados desde el backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://gana-como-loco-allrg1104-backend.vercel.app/v1/drivers/getAllParticip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'All@example.com',  // Puedes cambiar este valor por el que corresponda
            password: 'password123'       // Envía la contraseña también para la validación
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Actualiza los datos del usuario y la lista de códigos registrados
          setUser({ nombre: data[0].nombre, username: 'All@example.com' });
          setCodes(data.codes || []); // Asumimos que `codes` es parte de la respuesta
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchUserData(); // Llama a la función para obtener los datos del usuario

  }, []);

  // Función para enviar nuevo código al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCode) {
      try {
        const response = await fetch('/api/newCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: newCode })
        });

        const result = await response.json();
        if (response.ok) {
          // Actualiza la lista de códigos en la tabla
          setCodes([...codes, { fechaRegistro: new Date().toLocaleString(), numeroCodigo: newCode, estado: 'registrado' }]);
          setNewCode('');
        } else {
          console.error(result.mensaje);
        }
      } catch (error) {
        console.error('Error al registrar el código:', error);
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

export default UserHome;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/UserHome.css';

function UserHome() {
  const [user, setUser] = useState({ nombre: '', username: '' });
  const [newCode, setNewCode] = useState('');
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener datos del usuario y códigos registrados desde el backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://gana-como-loco-allrg1104-backend.vercel.app/v1/drivers/getAllParticip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: 'All@example.com',  // Puedes cambiar este valor por el que corresponda
            password: 'password123'       // Envía la contraseña también para la validación
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Actualiza los datos del usuario y la lista de códigos registrados
          setUser({ nombre: data[0].nombre, username: 'All@example.com' });
          setCodes(data.codes || []); // Asumimos que `codes` es parte de la respuesta
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchUserData(); // Llama a la función para obtener los datos del usuario

  }, []);

  // Función para enviar nuevo código al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCode) {
      try {
        const response = await fetch('/api/regCode', { // Cambiado a /regCode
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codigo: newCode })
        });

        const result = await response.json();
        if (response.ok) {
          // Actualiza la lista de códigos en la tabla
          setCodes([...codes, { fechaRegistro: new Date().toLocaleString(), numeroCodigo: newCode, estado: 'registrado' }]);
          setNewCode('');
        } else {
          console.error(result.mensaje);
        }
      } catch (error) {
        console.error('Error al registrar el código:', error);
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
