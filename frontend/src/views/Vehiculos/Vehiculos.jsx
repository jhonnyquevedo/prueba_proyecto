import { useEffect, useState, useContext } from "react";
import Card from "../../components/card/Card";
import { opciones } from "../../../public/opciones"; // de aca nos estamos trayendo las opciones que deberian estar en la base de datos, para poder mapear las opciones disponibles
import { Link } from "react-router-dom";
import './Vehiculos.css';
import { AuthContext } from '../../context/Context'

function Vehiculos() {

    const { getDataEstado, estados, getDataVehiculos, dataCompletaVehiculos, getDataMarca, marcas } = useContext(AuthContext)
    useEffect(() => {
        getDataVehiculos()
        getDataEstado()
        getDataMarca()
    }, [])

    // Estados para los filtros
    const [estadoOpcion, setEstadoOpcion] = useState("")
    const [categoriaOpcion, setCategoriaOpcion] = useState("")
    const [marcaOpcion, setMarcaOpcion] = useState("")
    const [modeloOpcion, setModeloOpcion] = useState("")
    const [añoOpcion, setAñoOpcion] = useState("")
    const [transmisionOpcion, setTransmisionOpcion] = useState("")

    // para ejecutar la descarga de la data de modelos segun la marca

    const [modelos, setModelos] = useState([])
    const getDataModelos = async (marcaOpcion) => {
        const id = marcaOpcion
        const url = `http://localhost:3000/modelos/${id}`
        console.log(url)
        try {
            const res = await fetch(url)
            const dataModelo = await res.json()
            setModelos(dataModelo)
        } catch (error) {
            console.log("no se pudo conectar con el servidor")
        }
    }

    // setear el cambio en la opcion seleccionada
    const cambioEnEstado = (element) => setEstadoOpcion(element.target.value)
    const cambioEnCategoria = (element) => setCategoriaOpcion(element.target.value)
    const cambioEnMarca = (element) => {
        setMarcaOpcion(element.target.value)
        getDataModelos(element.target.value) // funcion para la peticion get de modelos, pasando por parametro el valor actual, si dejo el marcaOpcion, se desfasa un tiempo
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

        const dataOrdenada = [...dataCompletaVehiculos].sort((a, b) => {
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
                        {estados?.map((estado, index) =>
                            <option value={estado.id_estado} key={index} >{estado.nombre}</option>
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
                        {marcas?.map((marca, index) =>
                            <option value={marca.id_marca} key={index}>{marca.nombre}</option>
                        )}
                    </select>

                    <select className="selectFiltros" value={modeloOpcion} disabled={!marcaOpcion} onChange={(element) => cambioEnModelo(element)}>
                        <option value="">Modelo</option>
                        {modelos?.map((modelo, index) =>
                            <option value={modelo.id_modelo} key={index}>{modelo.nombre}</option>
                        )}
                        console.log(marcaOpcion)
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
                        <button className="boton-k" onClick={() => ordenar('precio')} >Precio </button>
                    </div>
                    <div>
                        <button className="boton-k" onClick={() => ordenar('kilometraje')}>Kilometraje</button>
                    </div>
                    <div>
                        <button className="boton-k" onClick={() => ordenar('año')}>Año</button>
                    </div>
                </div>
            </div>

            <h1>AUTOS PUBLICADOS</h1>

            <div className="galeriaVehiculos">

                {dataCompletaVehiculos.map(element => (
                    <div key={element.id_publicacion} /* to={`/detalle/${element.id_publicacion}`} */>
                        <Card
                            id={element.id_publicacion}
                            imagen={element.imagen}
                            titulo={element.titulo}
                            marca={element.marca}
                            modelo={element.modelo}
                            año={element.año}
                            precio={element.precio}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Vehiculos;
