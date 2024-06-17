import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MisPublicaciones.css';

function MisPublicaciones() {
    const navigate = useNavigate();
    const [publicaciones, setPublicaciones] = useState([]);
    const usuarioActual = 1; // Aquí deberías obtener el ID del usuario actual de tu sistema

    useEffect(() => {
        obtenerPublicaciones();
    }, []);

    const obtenerPublicaciones = async () => {
        try {
            const response = await fetch('/vehiculos.json');
            const data = await response.json();
            const publicacionesUsuario = data.filter(pub => pub.id_usuario === usuarioActual);
            setPublicaciones(publicacionesUsuario);
        } catch (error) {
            console.error('Error al obtener publicaciones:', error);
        }
    };

    const handleVerDetalle = (idPublicacion) => {
        navigate(`/detalle/${idPublicacion}`);
    };

    const handleEditar = (idPublicacion) => {
        navigate(`/editar-publicacion/${idPublicacion}`);
    };

    const handleEliminar = (idPublicacion) => {
        console.log(`Eliminar publicación ${idPublicacion}`);
        setPublicaciones(publicaciones.filter(pub => pub.id_publicacion !== idPublicacion));
    };

    return (
        <div className="mis-publicaciones-container">
            <h1>Mis Publicaciones</h1>
            <div className="publicaciones-grid">
                {publicaciones.map((publicacion) => (
                    <div key={publicacion.id_publicacion} className="publicacion-card">
                        <img src={publicacion.imagen} alt={publicacion.titulo} />
                        <h2>{publicacion.titulo}</h2>
                        <div className="botones-container">
                            <button onClick={() => handleVerDetalle(publicacion.id_publicacion)}>Ver Detalle</button>
                            <button onClick={() => handleEditar(publicacion.id_publicacion)}>Editar</button>
                            <button onClick={() => handleEliminar(publicacion.id_publicacion)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MisPublicaciones;
