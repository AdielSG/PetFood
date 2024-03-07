import { useState } from 'react';
import axios from 'axios'; // Importa Axios
import { Link } from 'react-router-dom';
//import '../styles/LoginPage.css';
//import loginImage from '../images/foto.jpg';
import {useNavigate} from "react-router-dom"
import '../styles/css_seccion.css'

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = await axios.post('http://localhost:8000/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      console.log('Inicio de sesión exitoso', response.data);
      navigate("/principal")
      
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión', error.response.data);
    }
  };
  

  return (
    <div id='body-seccion'>
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Inicio de Sesion</h1>
          <div className="input-box">
            <input type="text" 
            placeholder='Usuario' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
            <i className="bx bx-user-circle"></i>
          </div>
          <div className="input-box">
            <input type="password" 
            placeholder='Contraseña' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type='submit' id="btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
