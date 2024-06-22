import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Detalle.css';

function Detalle() {
    const { id } = useParams();
    const location = useLocation();
    const usuarioActual = location.state?.usuarioActual || null;
    const [vehiculo, setVehiculo] = useState(null);

    useEffect(() => {
        fetchDataVehiculo(id);
    }, [id]);

    const fetchDataVehiculo = async (id) => {
        try {
            const res = await fetch('/vehiculos.json');
            const vehiculos = await res.json();
            const vehiculo = vehiculos.find((v) => v.id_publicacion === parseInt(id, 10));
            setVehiculo(vehiculo);
        } catch (error) {
            console.error('Error fetching vehiculo:', error);
        }
    };

    const contactarVendedor = (vehiculoId) => {
        alert(`Contactar al vendedor del vehículo con ID: ${vehiculoId}`);
    };

    if (!vehiculo) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="detalleVehiculo">
            <h1>{vehiculo.titulo}</h1>
            <div className="detalleVehiculo2">
                <img src={vehiculo.imagen} alt={vehiculo.titulo} />

                <div>
                    <h2>Precio: {vehiculo.precio}</h2>
                    <p><b>Estado:</b> {vehiculo.estado}</p>
                    <p><b>Marca:</b> {vehiculo.marca}</p>
                    <p><b>Modelo:</b> {vehiculo.modelo}</p>
                    <p><b>Año:</b> {vehiculo.año}</p>
                    <p><b>Kilometraje:</b> {vehiculo.kilometraje}</p>
                    <p><b>Transmisión: </b>{vehiculo.transmision}</p>
                    <p><b>Categoría:</b> {vehiculo.categoria}</p>
                    <p><b>Descripción:</b> {vehiculo.descripcion}</p>
                </div>

            </div>

            {vehiculo.id_usuario !== usuarioActual && (
                <button className='botonDetalle' onClick={() => contactarVendedor(vehiculo.id_publicacion)}>Contactar al vendedor</button>
            )}
        </div>
    );
}

export default Detalle;
