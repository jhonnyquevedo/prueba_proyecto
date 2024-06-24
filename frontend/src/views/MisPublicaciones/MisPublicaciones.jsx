import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MisPublicaciones.css';

function MisPublicaciones() {
    const navigate = useNavigate();
    const [publicaciones, setPublicaciones] = useState([]);
    const usuarioActual = 1; 

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
        navigate(`/detalle/${idPublicacion}`, { state: { usuarioActual } });
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
            <h1 className="mis-publicaciones-title">Mis Publicaciones</h1>
            <div className="publicaciones-grid">
                {publicaciones.map((publicacion) => (
                    <div key={publicacion.id_publicacion} className="publicacion-card">
                        <img src={publicacion.imagen} alt={publicacion.titulo} />
                        <h2 className="publicacion-title">{publicacion.titulo}</h2>
                        <div className="botones-container">
                            <button className='boton-MisPublicaciones' onClick={() => handleVerDetalle(publicacion.id_publicacion)}>Detalle</button>
                            <button className='boton-MisPublicaciones' onClick={() => handleEditar(publicacion.id_publicacion)}>Editar</button>
                            <button className='boton-MisPublicaciones' onClick={() => handleEliminar(publicacion.id_publicacion)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MisPublicaciones;
