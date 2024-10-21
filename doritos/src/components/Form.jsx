import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                callback(data.role);
                navigate(data.role === 'user' ? "/userHome" : "/adminHome");
            } else {
                setError(data.message || 'Error de autenticación');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error en la conexión con el servidor');
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Inicio de sesion</h1>
            <h4 className="txt">Correo: </h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />

            {/* Botón para crear usuario */}
            <button type="button" id="btnCreateUser" onClick={() => navigate('/createUser')}
            >   Crear Usuario
            </button>
            

        </form>

    );
}

export default Form;