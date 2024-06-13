import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/Context'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = () => {
        login()
        navigate('/')
    }
    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <div className="login-inputs">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Contraseña" />
            </div>
            <button onClick={handleLogin}>Ingresar</button>
            <div className="register-link">
                <p>¿Aún no tienes cuenta?</p>
                <NavLink to="/registro">Regístrate</NavLink>
            </div>
        </div>
    )
}

export default Login
