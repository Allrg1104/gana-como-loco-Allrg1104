import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setDateBorn] = useState('');
    const [cedula, setNit] = useState('');
    const [ciudad, setCity] = useState('');
    const [numeroCelular, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/createUser', {
                username,
                password,
                nombre,
                fechaNacimiento,
                cedula,
                ciudad,
                numeroCelular
            });

            if (response.data.success) {
                setSuccessMessage('Usuario creado exitosamente');
            } else {
                setErrorMessage(response.data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleCreateUser}>
                <div className='Bloque de registro'>
                    <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                    <input
                        type="text"
                        id="inputNombre"
                        placeholder="Nombre completo"
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="date-born">
                        <input
                            type="date"
                            id="inputPassword"
                            placeholder="Fecha de Nacimiento"
                            onChange={(e) => setDateBorn(e.target.value)}
                            required
                        />
                    </div>
                    <div className="cedula">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Documento de identificación"
                            onChange={(e) => setNit(e.target.value)}
                            required
                        />
                    </div>
                    <div className="ciudad">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Ciudad"
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="numeroCelular">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Número de celular"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="email">
                        <input
                            type="text"
                            id="inputUsername"
                            placeholder="Nombre de usuario"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="inputPassword"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Ocultar" : "Mostrar"} Contraseña
                        </button>
                    </div>
                    <button type="submit">Crear Usuario</button>
                    {successMessage && <p className="success">{successMessage}</p>}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}

export default CreateUser;

/*import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setDateBorn] = useState('');
    const [cedula, setNit] = useState('');
    const [ciudad, setCity] = useState('');
    const [numeroCelular, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:4000/v1/signos/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password, nombre, fechaNacimiento, cedula, ciudad, numeroCelular }), // Solo enviamos el username y password
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data && data.success) {
                setSuccessMessage('Usuario creado exitosamente');
            } else {
                setErrorMessage(data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleCreateUser}>

                <div className='Bloque de regitro'>

                    
                    <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                    <input
                        type="text"
                        id="inputNombre"
                        placeholder="Nombre completo"
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="date-born">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Fecha de Nacimiento"
                            onChange={(e) => setDateBorn(e.target.value)}
                            required
                        />
                    </div>

                    <div className="cedula">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Documento de identificacion"
                            onChange={(e) => setNit(e.target.value)}
                            required
                        />
                    </div>

                    <div className="ciudad">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Ciudad"
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>


                    <div className="numeroCelular">
                        <input
                            type="text"
                            id="inputPassword"
                            placeholder="Numero de celular"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="email">
                        <input
                            type="text"
                            id="inputUsername"
                            placeholder="Correo electronico"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="inputPassword"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                id="inputPassword"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            Mostrar contraseña
                        </label>
                    </div>

                </div>

                <button type="submit" id="btnCrearu">Crear Usuario</button>
                <button type="button" id="btnHome" onClick={() => navigate('/')}>Volver a Inicio</button>
            </form>

            //Mostrar mensajes de éxito o error 
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default CreateUser;*/
