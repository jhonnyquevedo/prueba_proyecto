import './EditarPublicacion.css'
import { useState, useEffect } from "react"

function EditarPublicaciones() {

    const [publicacion, setPublicacion] = useState()

    useEffect(()=>{
        getPublicacionById() // llamado a la api de la data de la publicacionque estamos editando
    }, [])

    const getPublicacionById = async () => {
        try {
            const res = await fetch("/publicacion.js")
            if (!res.ok){
                return console.log("error en el fetch")
            }
            const dataDePublicacion = await res.json()
            setPublicacion(dataDePublicacion)
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