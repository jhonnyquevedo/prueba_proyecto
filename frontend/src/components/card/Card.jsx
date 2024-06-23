import './card.css';
import { Link } from 'react-router-dom';

function Card({ id, imagen, titulo, marca, modelo, año, precio }) {

    return (
        <div className="card" /* key={elemento.id} */>
            <img src={imagen} className="card-img-top" alt="imagen del vehículo" />
            <div className="card-body-vehiculo">
                <div className='info-vehiculo'>
                <h5 className="card-title">{titulo}</h5>
                <span className="card-text">marca: {marca}</span>
                <span className="card-text">modelo: {modelo}</span>
                <span className="card-text">año: {año}</span>
                <span className="card-text">precio $: {precio}</span>
                </div>
                <div className='bton-card'>
                <Link to={`/detalle/${id}`} >
                    <button className='boton-1'>Ver detalle</button>
                </Link>
                </div>
            
            </div>
        </div>
    )

}

export default Card