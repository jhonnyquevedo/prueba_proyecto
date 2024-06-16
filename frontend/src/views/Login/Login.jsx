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
        <div className='container'>
            <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <div className="login-inputs">
                <input type="text" placeholder="Email" style={{ width: '200px' }}/>
                <input type="password" placeholder="Contraseña" style={{ width: '200px' }}/>
            </div>
            <button onClick={handleLogin}>Ingresar</button>
            <div className="register-link">
                <p>¿Aún no tienes cuenta?</p>
                <NavLink to="/registro">Regístrate</NavLink>
            </div>
        </div>
        
        </div>
    )
}

export default Login
