import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <header>
            <nav>
                <div className="buttons">
                    <NavLink to= "/" className="btn" activeClassName="active">Inicio</NavLink>
                    <NavLink to= "/vehiculos" className="btn" activeClassName="active">Vehículos</NavLink>
                    <NavLink to= "/regitro" className="btn" activeClassName="active">Registrate</NavLink>
                    <NavLink to= "/login" className="btn" activeClassName="active">Iniciar Sesion</NavLink>
                    <NavLink to= "/publicar" className="btn" activeClassName="active">Publicar Aviso</NavLink>
                </div>
            </nav>
        </header>

    );
}

export default Navbar;