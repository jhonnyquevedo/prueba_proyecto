import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { opciones } from "../../../public/opciones"; // de aca nos estamos trayendo las opciones que deberian estar en la base de datos, para poder mapear las opciones disponibles
import { Link } from "react-router-dom";
import './Vehiculos.css';
function Vehiculos() {
    
    useEffect(() => {
        getDataVehiculos()
    }, [])

     // llamado a la "api" para obtener la data de las publicaciones
    const [data, setData] = useState([])

    const getDataVehiculos = async () => {
        try {
            const urlApi = '/vehiculos.json'
            const res = await fetch(urlApi)
            const dataApi = await res.json()
            console.log("esta es la data", dataApi)
            setData(dataApi)
        } catch (error) {
            console.log("hay un error", error)
        }
    }


    // Estados para los filtros
    const [estadoOpcion, setEstadoOpcion] = useState("")
    const [categoriaOpcion, setCategoriaOpcion] = useState("")
    const [marcaOpcion, setMarcaOpcion] = useState("")
    const [modeloOpcion, setModeloOpcion] = useState("")
    const [añoOpcion, setAñoOpcion] = useState("")
    const [transmisionOpcion, setTransmisionOpcion] = useState("")

    // setear el cambio en la opcion seleccionada
    const cambioEnEstado = (element) => setEstadoOpcion(element.target.value)
    const cambioEnCategoria = (element) => setCategoriaOpcion(element.target.value)
    const cambioEnMarca = (element) => {
        setMarcaOpcion(element.target.value)
        setModeloOpcion('')
    }
    const cambioEnModelo = (element) => setModeloOpcion(element.target.value)
    const cambioEnAño = (element) => setAñoOpcion(element.target.value)
    const cambioEnTransmision = (element) => setTransmisionOpcion(element.target.value)

    // funcion para detectar la marca y poder mapear el modelo segun la marca
    const getModeloPorMarca = (marca) => {
        const marcaElegida = opciones[0].opcionMarcaYModelo.find(element => element.nombre === marca)
        return marcaElegida ? marcaElegida.modelos : []
    }

    // funcion para aplicar flitro
    const aplicarFiltro = () => {
         // logica para hacer el llamado a la api y que traiga la data con los filtros aplicados
        console.log("enviando peticion con filtros")
        alert("peticion hecha")
    }

    // funciones para ordenar la data
    const [configOrden, setConfigOrden] = useState({ key: '', direccion: 'asc' })

    const ordenar = (key) => {
        let direccion = 'asc'
        if (configOrden.key === key && configOrden.direccion === 'asc') { direccion = 'desc' }

        const dataOrdenada = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direccion === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direccion === 'asc' ? 1 : -1;
            }
            return 0;
        })

        setData(dataOrdenada)
        setConfigOrden({ key, direccion })
    }

    return (
        <div className="containerVehiculos">
            <div className="filtrosVehiculos">
                <label className="filtrarPor">
                    <h3>Filtrar por:</h3>
                </label>
                <div className="btnFiltros">
                    <select className="selectFiltros" value={estadoOpcion} onChange={(element) => cambioEnEstado(element)}>
                        <option value="">Estado</option>
                        {opciones[0].opcionesEstado?.map((estado, index) =>
                            <option value={estado} key={index} >{estado}</option>
                        )}
                    </select>
                    <select className="selectFiltros" value={categoriaOpcion} onChange={(element) => cambioEnCategoria(element)} >
                        <option value="">Categoria</option>
                        {opciones[0].opcionesCategoria?.map((categoria, index) =>
                            <option value={categoria} key={index}>{categoria}</option>
                        )}
                    </select>
                    <select className="selectFiltros" value={marcaOpcion} onChange={(element) => cambioEnMarca(element)}>
                        <option value="">Marca</option>
                        {opciones[0].opcionMarcaYModelo?.map((marca, index) =>
                            <option value={marca.nombre} key={index}>{marca.nombre}</option>
                        )}
                    </select>
                    <select className="selectFiltros" value={modeloOpcion} disabled={!marcaOpcion} onChange={(element) => cambioEnModelo(element)}>
                        <option value="">Modelo</option>
                        {getModeloPorMarca(marcaOpcion).map((modelo, index) =>
                            <option value={modelo} key={index}>{modelo}</option>
                        )}
                    </select>

                    <select className="selectFiltros" value={añoOpcion} onChange={(element) => cambioEnAño(element)}>
                        <option value="">Año</option>
                        {opciones[0].opcionAño?.sort((a, b) => b - a).map((año, index) =>
                            <option value={año} key={index}>{año}</option>
                        )}
                    </select>
                    <select className="selectFiltros" value={transmisionOpcion} onChange={cambioEnTransmision}>
                        <option value="">Transmision</option>
                        {opciones[0].opcionTransmision.map((transmision, index) =>
                            <option value={transmision} key={index}>{transmision}</option>
                        )}
                    </select>
                    <button className="btnBuscarFiltros" onClick={aplicarFiltro}>Buscar</button>
                </div>

                <div className="ordernarPor">
                    <h3>Ordenar por:</h3>
                </div>

                <div className="btnOrdenarPor">
                    <div>
                        <button className="boton" onClick={() => ordenar('precio')} >Precio </button>
                    </div>
                    <div>
                        <button className="boton" onClick={() => ordenar('kilometraje')}>Kilometraje</button>
                    </div>
                    <div>
                        <button className="boton" onClick={() => ordenar('año')}>Año</button>
                    </div>
                </div>
            </div>

            <h1>AUTOS PUBLICADOS</h1>

            <div className="galeriaVehiculos">
                
                {data.map(element => (
                    <Link key={element.id_publicacion} to={`/detalle/${element.id_publicacion}`}>
                        <Card
                            id={element.id_publicacion}
                            imagen={element.imagen}
                            titulo={element.titulo}
                            marca={element.marca}
                            modelo={element.modelo}
                            año={element.año}
                            transmision={element.transmision}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Vehiculos;
