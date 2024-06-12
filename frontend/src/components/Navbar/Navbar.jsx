import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {

    const setActiveClass = ({ isActive }) => (isActive ? 'active' : 'inactive')

    return (
        <header>
            <nav>
                <div className="buttons">
                    <NavLink className={`btn ${setActiveClass}`} to="/"  >Inicio</NavLink>
                    <NavLink className={`btn ${setActiveClass}`} to="/vehiculos" >Vehículos</NavLink>
                    <NavLink className={`btn ${setActiveClass}`} to="/regitro" >Registrate</NavLink>
                    <NavLink className={`btn ${setActiveClass}`} to="/login"  >Iniciar Sesion</NavLink>
                    <NavLink className={`btn ${setActiveClass}`} to="/publicar"  >Publicar Aviso</NavLink>
                </div>
            </nav>
        </header>

    )
}

export default Navbar;