import React, { useState } from 'react';
import './PublicarAviso.css';

function PublicarAviso() {
  const [vehiculo, setVehiculo] = useState({
    titulo: '',
    precio: '',
    estado: 'nuevo', 
    marca: '',
    modelo: '',
    año: '',
    kilometros: '',
    transmision: '',
    categoria: '',
    descripcion: '',
    imagen: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setVehiculo({ ...vehiculo, imagen: URL.createObjectURL(file) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del vehículo:', vehiculo);
    alert('Datos enviados exitosamente. Revisa la consola para ver los datos.');
    
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Información de tu aviso</h1>
        <form onSubmit={handleSubmit} className="form-vehiculo">
          <label>
            Título
            <input
              type="text"
              name="titulo"
              value={vehiculo.titulo}
              onChange={handleChange}
              required
            />
          </label>
          <div className="inline-fields">
            <label>
              Precio
              <input
                type="text"
                name="precio"
                value={vehiculo.precio}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Estado
              <select
                name="estado"
                value={vehiculo.estado}
                onChange={handleChange}
                required
              >
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>
            </label>
          </div>
          <div className="inline-fields">
            <label>
              Marca
              <input
                type="text"
                name="marca"
                value={vehiculo.marca}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Modelo
              <input
                type="text"
                name="modelo"
                value={vehiculo.modelo}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="inline-fields">
            <label>
              Año
              <input
                type="number"
                name="año"
                value={vehiculo.año}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Kilómetros
              <input
                type="text"
                name="kilometros"
                value={vehiculo.kilometros}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="inline-fields">
            <label>
              Transmisión
              <input
                type="text"
                name="transmision"
                value={vehiculo.transmision}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Categoría
              <input
                type="text"
                name="categoria"
                value={vehiculo.categoria}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label>
            Descripción
            <textarea
              name="descripcion"
              value={vehiculo.descripcion}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Imagen
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
          {vehiculo.imagen && <img src={vehiculo.imagen} alt="Vehículo" className="imagen-vehiculo" />}
          <button type="submit" className="boton-publicar">Publicar</button>
        </form>
      </div>
    </div>
  );
}

export default PublicarAviso;
