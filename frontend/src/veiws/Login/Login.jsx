import './Login.css'
import { NavLink } from "react-router-dom";


function Login() {
    return (
        <div>
            <h1>Registrate</h1>
            <div>
                <input type="text" placeholder="Email"/>
                <input type="text" placeholder="Contraseña"/>
            </div>
            <button>Ingresar</button>
            <div>
            <p>Aún no tienes cuenta? </p>
            <NavLink to={"/registro"}>Registrate</NavLink>
            </div>
        </div>
    )
}

export default Login