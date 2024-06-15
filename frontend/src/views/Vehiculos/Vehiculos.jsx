import React from "react";
import { useEffect, useState } from "react";
import { vehiculos } from './vehiculos' // esto es una data provisional que simula lo que entregará la BD
import Card from "../../components/card/Card";
import { opciones } from "../../../public/opciones"; // de aca nos estamos trayendo las opciones que deberian estar en la base de datos, para poder mapear las opciones disponibles

function Vehiculos() {

    useEffect(() => {
        setData(vehiculos)
    }, [])

    const [data, setData] = useState([])

    // Estados para los filtros
    const [estadoOpcion, setEstadoOpcion] = useState("seleccionar")
    const [categoriaOpcion, setCategoriaOpcion] = useState("seleccionar")
    const [marcaOpcion, setMarcaOpcion] = useState("seleccionar")
    const [modeloOcion, setModeloOpcion] = useState("seleccionar")
    const [añoOpcion, setAñoOpcion] = useState("seleccionar")
    const [transmisionOpcion, setTransmisionOpcion] = useState("seleccionar")
    console.log("estos son los filtros seleccionados ", estadoOpcion, categoriaOpcion, marcaOpcion, modeloOcion, añoOpcion, transmisionOpcion)

    const cambioEnEstado = (element) => setEstadoOpcion(element.target.value)
    const cambioEnCategoria = (element) => setCategoriaOpcion(element.target.value)
    const cambioEnMarca = (element) => {
        setMarcaOpcion(element.target.value)
        setModeloOpcion('')
    }
    const cambioEnModelo = (element) => setModeloOpcion(element.target.value)
    const cambioEnAño = (element) => setAñoOpcion(element.target.value)
    const cambioEnTransmision = (element) => setTransmisionOpcion(element.target.value)

    const getModeloPorMarca = (marca) => {
        const marcaElegida = opciones[0].opcionMarcaYModelo.find(element => element.nombre === marca)
        return marcaElegida ? marcaElegida.modelos : []
    }

    return (
        <div>
            <div className="filtrosVehiculos">
                <label>
                    <h3>Filtrar por:</h3>
                </label>
                <div className="btnFiltros">
                    <select value={estadoOpcion} onChange={(element) => cambioEnEstado(element)}>
                        <option value="">Estado</option>
                        {opciones[0].opcionesEstado?.map((estado, index) =>
                            <option value={estado} key={index} >{estado}</option>
                        )}
                    </select>
                    <select value={categoriaOpcion} onChange={(element) => cambioEnCategoria(element)} >
                        <option value="">Categoria</option>
                        {opciones[0].opcionesCategoria?.map((categoria, index) =>
                            <option value={categoria} key={index}>{categoria}</option>
                        )}
                    </select>
                    <select value={marcaOpcion} onChange={(element) => cambioEnMarca(element)}>
                        <option value="">Marca</option>
                        {opciones[0].opcionMarcaYModelo?.map((marca, index) =>
                            <option value={marca.nombre} key={index}>{marca.nombre}</option>
                        )}
                    </select>

                    <select value={modeloOcion} disabled={!marcaOpcion} onChange={(element) => cambioEnModelo(element)}>
                        <option value="">Modelo</option>
                        {getModeloPorMarca(marcaOpcion).map((modelo, index) =>
                            <option value={modelo} key={index}>{modelo}</option>
                        )}
                    </select>

                    <select value={añoOpcion} onChange={(element) => cambioEnAño(element)}>
                        <option value="">Año</option>
                        {opciones[0].opcionAño?.sort((a, b) => b - a).map((año, index) =>
                            <option value={año} key={index}>{año}</option>
                        )}
                    </select>
                    <select value={transmisionOpcion} onChange={cambioEnTransmision}>
                        <option value="">Transmision</option>
                        {opciones[0].opcionTransmision.map((transmision, index) =>
                            <option value={transmision} key={index}>{transmision}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="galeriaVehiculos">
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
        </div>

    )
}

export default Vehiculos; 