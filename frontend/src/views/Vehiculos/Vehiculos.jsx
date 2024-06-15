import React from "react";
import { useEffect, useState } from "react";
import { vehiculos } from './vehiculos'
import Card from "../../components/card/Card";

function Vehiculos() {

    useEffect(() => {
        //getData()
        setData(vehiculos)
    }, [])

    const [data, setData] = useState([])

    /* const getData = async () => {
        try {
            const response = await fetch('') // revisar la ruta la peticion se esta haciendo mal
            const dataCar = await response.json()
            console.log(dataCar)
            setData(dataCar)
        } catch (error) {
            console.log("error en la peticion", error.message)
        }

    } */

    return (
        <div>
            <h1>AUTOS PUBLICADOS</h1>
            {data.map(element => (
                <Card
                    key={element.id}
                    id={element.id}
                    imagen={element.imagen}
                    titulo={element.titulo}
                    marca={element.marca}
                    modelo={element.modelo}
                    año={element.año}
                    transmision={element.transmision}
                />
            ))}
        </div>

    )
}

export default Vehiculos; 