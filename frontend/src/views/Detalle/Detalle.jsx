import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Detalle.css';
import { GiGearStick } from "react-icons/gi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { IoLogoModelS } from "react-icons/io";
import { LiaClipboardListSolid } from "react-icons/lia";

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

    const esPropietario = vehiculo.id_usuario === usuarioActual;

    return (
        <div className="detalleVehiculo">
            <h1>{vehiculo.titulo}</h1>
            <div className="detalleVehiculo2">
                <img  src={vehiculo.imagen} alt={vehiculo.titulo} />

                <div>
                    <h2> <MdOutlineAttachMoney className='iconoDetalle'/>  Precio: {vehiculo.precio}</h2>
                    <hr />
                    <p><b> <MdOutlineWatchLater className='iconoDetalle' />  Estado:</b> {vehiculo.estado}</p>
                    <hr />
                    <p><b> <LiaClipboardListSolid className='iconoDetalle' />  Categoría:</b> {vehiculo.categoria}</p>
                    <hr />
                    <p><b> <IoPricetagsOutline className='iconoDetalle' />  Marca:</b> {vehiculo.marca}</p>
                    <hr />
                    <p><b> <IoLogoModelS className='iconoDetalle' />  Modelo:</b> {vehiculo.modelo}</p>
                    <hr />
                    <p><b> <HiOutlineCalendarDays className='iconoDetalle' />  Año:</b> {vehiculo.año}</p>
                    <hr />
                    <p><b> <LiaTachometerAltSolid className='iconoDetalle' />  Kilometraje:</b> {vehiculo.kilometraje}</p>
                    <hr />
                    <p><b> <GiGearStick className='iconoDetalle' /> Transmisión: </b>{vehiculo.transmision}</p>
                    <hr />
                    
                    <p><b>Descripción:</b> {vehiculo.descripcion}</p>
                </div>
            </div>

            {!esPropietario && (
                <button onClick={() => contactarVendedor(vehiculo.id_publicacion)}>Contactar al vendedor</button>
            )}
        </div>
    );
}

export default Detalle;
