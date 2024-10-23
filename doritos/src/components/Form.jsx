import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/v1/drivers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok :P');
            }

            const data = await response.json();

            if (data && data.success) {
                alert(data.message);
                navigate('/UserHome');
            } else {
                alert(data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('El usuario o contraseña no son correctos');
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Inicio de sesión</h1>
            <h4 className="txt">Correo: </h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)}required /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)}required /><br />
            
            {/* Botón para Inicio de sesion */}
            <button type="submit" id="btnCreateUser">
                Ingresar
            </button>
            <button type="button" id="btnCreateUser" onClick={() => navigate('/createUser')}>
                Crear Usuario
            </button>
            <button type="button" id="btnCreateUser" onClick={() => navigate('/UserHome')}>
                Usuario
            </button>
        </form>
    );
}

export default LoginUser;
