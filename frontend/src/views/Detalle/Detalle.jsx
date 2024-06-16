import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detalle() {
    const { id } = useParams();
    const [vehiculo, setVehiculo] = useState(null); 

    useEffect(() => {
        fetchDataVehiculo(id);
    }, [id]);

    const fetchDataVehiculo = async (id) => {
        const dataVehiculo = {
            id: id,
            titulo: "Toyota Corolla 2022",
            imagen: "https://ejemplo.com/imagen.jpg",
            precio: "20000",
            estado: "Usado",
            marca: "Toyota",
            modelo: "Corolla",
            año: 2022,
            km: "50000",
            transmision: "Automática",
            categoria: "Sedán",
            descripcion: "Este es un vehículo Toyota Corolla usado en excelente estado.",
        };

        await new Promise(resolve => setTimeout(resolve, 1000));

        setVehiculo(dataVehiculo);
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
                <p>Kilometraje: {vehiculo.km}</p>
                <p>Transmisión: {vehiculo.transmision}</p>
                <p>Categoría: {vehiculo.categoria}</p>
                <p>Descripción: {vehiculo.descripcion}</p>
            </div>

            <button onClick={() => contactarVendedor(vehiculo.id)}>Contactar al vendedor</button>
        </div>
    );
}

// Se simula el contacto al vendedor )
const contactarVendedor = (vehiculoId) => {
    alert(`Contactar al vendedor del vehículo con ID: ${vehiculoId}`);
};

export default Detalle;
