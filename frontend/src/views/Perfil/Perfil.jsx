import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './Perfil.css';
import fotoPerfil from '../../assets/img/vehiculo1.jpg'

function Perfil() {
  const [usuario] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: '123-456-7890',
    foto: fotoPerfil
  });

  const handleEditar = () => {
    console.log('Editar perfil');
  };

  const handleEliminar = () => {
    console.log('Eliminar cuenta');
  };

  return (
    <div className="contenedor-perfil">
      <div className="bienvenida">
        <h1>Bienvenido, {usuario.nombre}!</h1>
      </div>
      <div className="info-usuario">
        <img src={usuario.foto} alt="Foto de perfil" className="foto-perfil" />
        <div className="campos">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Apellido:</strong> {usuario.apellido}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
        </div>
      </div>
      <div className="acciones">
      <button className="boton-icono" onClick={handleEditar}>
          <FontAwesomeIcon icon={faEdit} style={{ color: '#FFD43B' }} />
          <p>Editar</p>
        </button>
        <button className="boton-icono" onClick={handleEliminar}>
          <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#e40c0c' }} />
          <p>Eliminar cuenta</p>
        </button>
      </div>
    </div>
  );
}

export default Perfil;
