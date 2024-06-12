import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Context";

function Navbar() {

    const { isAuthenticated, logout } = useAuth();
    const setActiveClass = ({ isActive }) => (isActive ? 'active' : 'inactive')

    return (
        <header>
            <nav>
                <div className="buttons">
                    <NavLink className={`btn ${setActiveClass}`} to="/" >Inicio</NavLink>
                    <NavLink className={`btn ${setActiveClass}`} to="/vehiculos" >Vehículos</NavLink>
                    {!isAuthenticated ? (
                        <>
                            <NavLink className={`btn ${setActiveClass}`} to="/registro" >Regístrate</NavLink>
                            <NavLink className={`btn ${setActiveClass}`} to="/login" >Iniciar Sesión</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className={`btn ${setActiveClass}`} to="/mis-publicaciones" >Mis Publicaciones</NavLink>
                            <NavLink className={`btn ${setActiveClass}`} to="/perfil" >Perfil</NavLink>
                            <button className="btn" onClick={logout}>Cerrar Sesión</button>
                        </>
                    )}
                    <NavLink className={`btn ${setActiveClass}`} to="/publicar" >Publicar Aviso</NavLink>
                </div>
            </nav>
        </header>

    )
}

export default Navbar;