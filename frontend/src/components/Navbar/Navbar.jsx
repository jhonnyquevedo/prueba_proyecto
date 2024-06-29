import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/Context';
import logo from '../../assets/logo/logo.png';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div>
        <NavLink className={`base ${setActiveClass}`} to="/" exact="true" activeclassname="active-link">
          <img src={logo} alt="Logo" style={{ width: "100px", height: "100px", marginLeft: "30px" }} />
        </NavLink>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`botones ${menuOpen ? 'open' : ''}`}>
        {!isAuthenticated ? (
          <>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/login" activeclassname="active-link">
                <h6>Iniciar Sesión</h6>
              </NavLink>
            </div>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/registro" activeclassname="active-link">
                <h6>Registrarse</h6>
              </NavLink>
            </div>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/vehiculos" activeclassname="active-link">
                <h6>Vehículos</h6>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/vehiculos" activeclassname="active-link">
                <h6>Vehículos</h6>
              </NavLink>
            </div>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/publicar" activeclassname="active-link">
                <h6>Publicar</h6>
              </NavLink>
            </div>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/mis-publicaciones" activeclassname="active-link">
                <h6>Mis Publicaciones</h6>
              </NavLink>
            </div>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/perfil" activeclassname="active-link">
                <h6>Perfil</h6>
              </NavLink>
            </div>
            <div className="boton">
              <NavLink className={`base ${setActiveClass}`} to="/" onClick={handleLogout} activeclassname="active-link">
                <h6>Cerrar Sesión</h6>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
