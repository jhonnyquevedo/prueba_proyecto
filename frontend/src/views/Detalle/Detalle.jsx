import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detalle() {
    const { id } = useParams();
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

    if (!vehiculo) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="detalleVehiculo">
            <h1>{vehiculo.titulo}</h1>
            <img src={vehiculo.imagen} alt={vehiculo.titulo} />

            <div>
                <h2>Precio: {vehiculo.precio}</h2>
                <p>Estado: {vehiculo.estado}</p>
                <p>Marca: {vehiculo.marca}</p>
                <p>Modelo: {vehiculo.modelo}</p>
                <p>Año: {vehiculo.año}</p>
                <p>Kilometraje: {vehiculo.kilometraje}</p>
                <p>Transmisión: {vehiculo.transmision}</p>
                <p>Categoría: {vehiculo.categoria}</p>
                <p>Descripción: {vehiculo.descripcion}</p>
            </div>

            <button onClick={() => contactarVendedor(vehiculo.id_publicacion)}>Contactar al vendedor</button>
        </div>
    );
}

// Se simula el contacto al vendedor )
const contactarVendedor = (vehiculoId) => {
    alert(`Contactar al vendedor del vehículo con ID: ${vehiculoId}`);
};

export default Detalle;
