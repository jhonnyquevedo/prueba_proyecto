// Detalle.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function Detalle() {
    let { id } = useParams();
    
    return (
        <div>
            <h1>Detalle del Vehículo</h1>
        </div>
    );
}

export default Detalle;
