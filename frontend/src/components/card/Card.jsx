import './card.css';
import { Link } from 'react-router-dom';

function Card({ id, imagen, titulo, marca, modelo, año, transmision }) {

    return (
        <div className="card" style={{ width: "250px" }}/* key={elemento.id} */>
            <img src={imagen} className="card-img-top" alt="imagen del vehículo" />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">marca: {marca}</p>
                <p className="card-text">modelo: {modelo}</p>
                <p className="card-text">año: {año}</p>
                <p className="card-text">transmision: {transmision}</p>

                <Link to={`/detalle/${id}`} >
                    <button>Ver detalle</button>
                </Link>
            </div>
        </div>
    )

}

export default Card