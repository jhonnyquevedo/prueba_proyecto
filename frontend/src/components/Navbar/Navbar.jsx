import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/Context';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="nav">
        <div className="buttons">
          <NavLink to="/" exact="true" activeclassname="active-link">
            <img src="https://via.placeholder.com/300" alt="Logo" />
          </NavLink>
          {!isAuthenticated ? (
            <>
    
              <NavLink to="/login" activeclassname="active-link"
                Iniciar Sesión
              </NavLink>
              <NavLink to="/registro" activeclassname="active-link">
                Registrarse
              </NavLink>
              <NavLink to="/vehiculos" activeclassname="active-link">
                Vehículos
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/vehiculos" activeclassname="active-link">
                Vehículos
              </NavLink>
              <NavLink to="/publicar" activeclassname="active-link">
                Publicar
              </NavLink>
              <NavLink to="/mis-publicaciones" activeclassname="active-link">
                Mis Publicaciones
              </NavLink>
              <NavLink to="/perfil" activeclassname="active-link">
                Perfil
              </NavLink>
              <NavLink to="/login" activeclassname="active-link" onClick={logout}>
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
