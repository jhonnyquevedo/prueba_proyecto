import './card.css';
import { Link } from 'react-router-dom';

function Card({ id, imagen, titulo, marca, modelo, año, transmision }) {

    return (
        <div className='card' /* key={elemento.id } */>
            <label className='fotoVehiculo'>
                <img src={imagen} alt="imagen del vehiculo" />
            </label>
            <div className='descripcionCardVehiculo'>
                <h3>{titulo}</h3>
                <label>
                    <p>marca: {marca}</p>
                    <p>modelo: {modelo}</p>
                </label>
                <label>
                    <p>año: {año}</p>
                </label>
                <label>
                    <p>transmision: {transmision}</p>
                </label>
            </div>
            <Link to={`/detalle/${id}`}>
            <button>Ver detalle</button>
        </Link>
        </div>
    )
}

export default Card