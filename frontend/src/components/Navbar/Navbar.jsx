import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Context";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");

  return (
    <header>
      <nav className="nav" >
        <div className="buttons">
          {!isAuthenticated ? (
            <>
              <NavLink className={setActiveClass} to="/">
                <img src="https://via.placeholder.com/300" alt="" />
              </NavLink>
              <NavLink active className={setActiveClass} to="/login">
                Iniciar Sesión
              </NavLink>
              <NavLink className={setActiveClass} to="/registro">
                Registrarse
              </NavLink>
              <NavLink className={setActiveClass} to="/vehiculos">
                Vehiculos
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className={setActiveClass} to="/vehiculos">
                Vehiculos
              </NavLink>
              <NavLink className={setActiveClass} to="/publicar">
                Publicar
              </NavLink>
              <NavLink className={setActiveClass} to="/mis-publicaciones">
                Mis Publicaciones
              </NavLink>
              <NavLink className={setActiveClass} to="/perfil">
                Perfil
              </NavLink>
              <NavLink className={setActiveClass} to="/login" onClick={logout}>
                Cerrar Sesión
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;