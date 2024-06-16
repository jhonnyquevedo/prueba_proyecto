import React, { useState } from 'react';
import './EditarPerfil.css';

function EditarPerfil() {

  // aqui debemos hacer la logica de recibir el token con estos datos, validarlo, y es o que tenemos que setear en el estado de usuario
  const [usuario, setUsuario] = useState({
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@example.com',
    telefono: '+56 ',
    foto: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'telefono') {
      if (value.startsWith('+56 ')) {
        if (value.length <= 13) {
          setUsuario({ ...usuario, telefono: value });
        }
      } else if (value.startsWith('+56')) {
        setUsuario({ ...usuario, telefono: '+56 ' });
      }
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUsuario({ ...usuario, foto: URL.createObjectURL(file) });
  };

  const handleGuardar = (event) => {
    event.preventDefault();
    // Aquí pondremos el codigo para guardar los cambios
    console.log('Guardar cambios:', usuario);
    alert('Los cambios han sido guardados exitosamente.');
  };

  return ( 
    <div className="contenedor-editar-perfil">
      <h1>Editar Perfil</h1>
      <form onSubmit={handleGuardar}>
        <div className="campo">
          <label>Nombre</label>
          <input // el nombre y el apellido no se pueden cambiar una vez ingresado el usuario, solo debemos dejar habilitado el cambio para telefono, email y foto
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo">
          <label>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            pattern="^\+56\s\d{9}$" 
            title="Debe empezar con +56 seguido de 9 dígitos"
            required
          />
        </div>
        <div className="campo">
          <label>Imagen de perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {usuario.foto && <img src={usuario.foto} alt="Imagen de perfil" className="imagen-perfil" />}
        </div>
        <button type="submit" className="boton-guardar">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditarPerfil;
