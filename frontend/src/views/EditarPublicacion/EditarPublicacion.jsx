import './EditarPublicacion.css'
import { useState, useEffect } from "react"
import { opciones } from "../../../public/opciones"; // de aca nos estamos trayendo las opciones que deberian estar en la base de datos, para poder mapear las opciones disponibles
import { NavLink, useNavigate } from "react-router-dom"

function EditarPublicaciones() {

    const navigate = useNavigate()
    const [vehiculoEditado, setVehiculoEditado] = useState([])

    useEffect(() => {
        getPublicacionById() // llamado a la api de la data de la publicacionque estamos editando
    }, [])

    const getPublicacionById = async () => {
        try {
            const res = await fetch("/publicacion.json")
            const dataDePublicacion = await res.json()
            setVehiculoEditado(dataDePublicacion)
        } catch (error) {
            console.log("algo paso", error)
        }
    }

    // Estados para guardar la marca seleccionada

    const [marcaOpcion, setMarcaOpcion] = useState("")

    // setear el cambio en la opcion seleccionada

    const cambioEnMarca = (element) => {
        setMarcaOpcion(element.target.value)
    }

    // funcion para detectar la marca y poder mapear el modelo segun la marca
    const getModeloPorMarca = (marca) => {
        const marcaElegida = opciones[0].opcionMarcaYModelo.find(element => element.nombre === marca)
        return marcaElegida ? marcaElegida.modelos : []
    }

    const handleChangeMarca = (event) => {
        const { name, value } = event.target;
        setVehiculoEditado({ ...vehiculoEditado, [name]: value });
        cambioEnMarca(event)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setVehiculoEditado({ ...vehiculoEditado, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setVehiculoEditado({ ...vehiculoEditado, imagen: URL.createObjectURL(file) });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // hacer la peticion PUT con el id_publicacion para actualizar
        console.log('Datos del vehículo:', vehiculoEditado);
        alert('Datos enviados exitosamente. Revisa la consola para ver los datos.');
        navigate('/mis-publicaciones')
    };

    return (
        <div>

            <div>
                <div className="center">
                    <h1>Editar información de tu aviso</h1>
                    <form onSubmit={handleSubmit} className="form-vehiculo">
                        <label>
                            Título
                            <input
                                type="text"
                                name="titulo"
                                value={vehiculoEditado.titulo}
                                onChange={handleChange}
                                placeholder={vehiculoEditado.titulo}
                                required
                            />
                        </label>
                        <div className="inline-fields">
                            <label>
                                Precio
                                <input
                                    type="text"
                                    name="precio"
                                    value={vehiculoEditado.precio}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Estado {/* revisar este */}
                                <select
                                    name="estado"
                                    value={vehiculoEditado.estado}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Estado</option>
                                    {opciones[0].opcionesEstado?.map((estado, index) =>
                                        <option value={estado} key={index} >{estado}</option>
                                    )}
                                </select>
                            </label>
                        </div>
                        <div className="inline-fields">
                            <label>
                                Marca
                                <select
                                    name="marca"
                                    value={vehiculoEditado.marca}
                                    onChange={handleChangeMarca}
                                    required
                                >
                                    <option value="">Marca</option>
                                    {opciones[0].opcionMarcaYModelo?.map((marca, index) =>
                                        <option value={marca.nombre} key={index}>{marca.nombre}</option>
                                    )}
                                </select>
                            </label>
                            <label>
                                Modelo
                                <select
                                    name="modelo"
                                    value={vehiculoEditado.modelo}
                                    disabled={!marcaOpcion}
                                    onChange={handleChange}
                                >
                                    <option value="">Modelo</option>
                                    {getModeloPorMarca(marcaOpcion).map((modelo, index) =>
                                        <option value={modelo} key={index}>{modelo}</option>
                                    )}
                                </select>

                            </label>
                        </div>
                        <div className="inline-fields">
                            <label>
                                Año
                                <input
                                    type="number"
                                    name="año"
                                    value={vehiculoEditado.año}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Kilómetros
                                <input
                                    type="number"
                                    name="kilometros"
                                    value={vehiculoEditado.kilometraje}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                        <div className="inline-fields">
                            <label>
                                Transmisión
                                <select
                                    name="transmision"
                                    value={vehiculoEditado.transmision}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Transmision</option>
                                    {opciones[0].opcionTransmision.map((transmision, index) =>
                                        <option value={transmision} key={index}>{transmision}</option>
                                    )}
                                </select>
                            </label>
                            <label>
                                Categoría
                                <select
                                    name="categoria"
                                    value={vehiculoEditado.categoria}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Categoria</option>
                                    {opciones[0].opcionesCategoria?.map((categoria, index) =>
                                        <option value={categoria} key={index}>{categoria}</option>
                                    )}
                                </select>
                            </label>
                        </div>
                        <label>
                            Descripción
                            <textarea
                                name="descripcion"
                                value={vehiculoEditado.descripcion}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Imagen
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </label>
                        {vehiculoEditado.imagen && <img src={vehiculoEditado.imagen} alt="Vehículo" className="imagen-vehiculo" />}
                        <button type="submit" className="boton-publicar">Actualizarr</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditarPublicaciones