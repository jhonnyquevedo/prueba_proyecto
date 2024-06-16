import './EditarPublicacion.css'
import { useState, useEffect } from "react"

function EditarPublicaciones() {

    const [publicacion, setPublicacion] = useState({})

    useEffect(()=>{
        getPublicacionById() // llamado a la api de la data de la publicacionque estamos editando
        console.log("hola")
    }, [])

    const getPublicacionById = async () => {
        try {
            const res = await fetch("/publicacion.json")
            const dataDePublicacion = await res.json()
            setPublicacion(dataDePublicacion)
            console.log(dataDePublicacion)
            return dataDePublicacion
        } catch (error) {
            console.log("algo paso")
        }
    }

    return (
        <h1>editar publicacion</h1>
    )
}

export default EditarPublicaciones