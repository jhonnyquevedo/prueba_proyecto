import React, { useState } from 'react';
import { opciones } from "../../../public/opciones";
import './PublicarAviso.css';

const formatNumber = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

function PublicarAviso() {
  const [vehiculo, setVehiculo] = useState({
    titulo: '',
    precio: '',
    estado: '',
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

    // Si el campo es 'precio', elimina los puntos para que se pueda formatear correctamente
    if (name === 'precio' || name === 'kilometros') {
      const rawValue = value.replace(/\./g, '');
      if (!isNaN(Number(rawValue))) {
        setVehiculo({ ...vehiculo, [name]: formatNumber(rawValue) });
      }
    } else {
      setVehiculo({ ...vehiculo, [name]: value });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setVehiculo({ ...vehiculo, imagen: URL.createObjectURL(file) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación adicional para el campo "estado"
    if (vehiculo.estado === '') {
      alert('Por favor, selecciona el estado del vehículo (Nuevo o Usado).');
      return;
    }

    console.log('Datos del vehículo:', vehiculo);
    alert('Datos enviados exitosamente. Revisa la consola para ver los datos.');
  };

  // falta dejar mapeados los select ya que los datos se deben seleccionar 
  const getModeloPorMarca = (marca) => {
    const marcaElegida = opciones[0].opcionMarcaYModelo.find(element => element.nombre === marca);
    return marcaElegida ? marcaElegida.modelos : [];
  };

  return (

    <div className="container-publicar-aviso">
      <h1 className='titulo-publicar-aviso'>Información de tu aviso</h1>
      <form onSubmit={handleSubmit} className="formulario-publicar">
        <label className="label-publicar-aviso">
          Título
          <input className='input-publicar-aviso'
            type="text"
            name="titulo"
            value={vehiculo.titulo}
            onChange={handleChange}
            required
          />
        </label >
        <div className="inline-fields">

          <label className="label-publicar-aviso">
            Estado
            <select
              name="estado"
              value={vehiculo.estado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </label >
          <label className="label-publicar-aviso">
            Categoría
            <select className='input-publicar-aviso'
              type="text"
              name="categoria"
              value={vehiculo.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Categoria</option>
              {opciones[0].opcionesCategoria?.map((categoria, index) =>
                <option value={categoria} key={index}>{categoria}</option>
              )}
            </select>
          </label>
        </div>
        <div className="inline-fields">
          <label className="label-publicar-aviso">
            Marca
            <select className='input-publicar-aviso'
              type="text"
              name="marca"
              value={vehiculo.marca}
              onChange={handleChange}
              required
            >
              <option value="">Marca</option>
              {opciones[0].opcionMarcaYModelo?.map((marca, index) =>
                <option value={marca.nombre} key={index}>{marca.nombre}</option>
              )}
            </select>
          </label>
          <label className="label-publicar-aviso">
            Modelo
            <select className='input-publicar-aviso'
              type="text"
              name="modelo"
              value={vehiculo.modelo}
              disabled={!vehiculo.marca}
              onChange={handleChange}
              required
            >
              <option value="">Modelo</option>
              {getModeloPorMarca(vehiculo.marca).map((modelo, index) =>
                <option value={modelo} key={index}>{modelo}</option>
              )}
            </select>
          </label>
        </div>
        <div className="inline-fields">
          <label className="label-publicar-aviso">
            Año
            <select className='input-publicar-aviso'
              type="number"
              name="año"
              value={vehiculo.año}
              onChange={handleChange}
              required
            >
              <option value="">Año</option>
              {opciones[0].opcionAño?.map((año, index) =>
                <option value={año} key={index}>{año}</option>
              )}
            </select>
          </label>
          <label className="label-publicar-aviso">
            Kilómetros
            <input className='input-publicar-aviso'
              type="text"
              name="kilometros"
              value={vehiculo.kilometros}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="inline-fields">
          <label className="label-publicar-aviso">
            Transmisión
            <select className='input-publicar-aviso'
              type="text"
              name="transmision"
              value={vehiculo.transmision}
              onChange={handleChange}
              required
            >
            <option value="">Transmisión</option>
              <option value="nuevo">Manual</option>
              <option value="usado">Automático</option>
            </select>
          </label>
          <label className="label-publicar-aviso">
            Precio
            <input className='input-publicar-aviso'
              type="text"
              name="precio"
              value={vehiculo.precio}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label className="label-publicar-aviso">
          Descripción
          <textarea
            name="descripcion"
            value={vehiculo.descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <label className="label-publicar-aviso">
          Imagen
          <input className='input-publicar-aviso'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>
        {vehiculo.imagen && <img src={vehiculo.imagen} alt="Vehículo" className="imagen-publicar-aviso" />}
      </form >

      <div className='btn-publicar'>
        <button type="submit" className="boton-publicar-aviso">Publicar</button>
      </div>
    </div >

  );
}

export default PublicarAviso;
