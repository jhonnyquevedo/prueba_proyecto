import './Registro.css'
import { useState } from 'react'

function Registro() {

    //Expresión regular para validar que el campo de email contenga el formato adecuado
    const regexParaEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    //Expresión regular para validar el campo de contraseña solicita un mínimo de 8 caracteres y un máximo de 15 , al menos una letra minúscula, al menos una letra mayúscula, al menos 1 dígito (número), al menos 1 caracter especial, que no existan espacios en blanco y al menos 1 símbolo para más seguridad fuente https://es.stackoverflow.com/questions/4300/expresiones-regulares-para-contrase%C3%B1a-en-base-a-una-politica.
    const regexPas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.-])[A-Za-z\d$@$!%*?&.-]{8,15}$/;

    const [error, setError] = useState("")
    const [succes, setSucces] = useState("")

    //falta hacer las validaciones con regex para email y contraseña
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        numero: '',
        email: '',
        imagen: null,
        contraseña: '',
        confirmarContraseña: ''
    })



    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevoUsuario({ ...nuevoUsuario, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNuevoUsuario({ ...nuevoUsuario, imagen: URL.createObjectURL(file) });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //Se elimina el mensaje de succes
        setSucces("")

        // Se validan los input
        if (nuevoUsuario.nombre === "") {
            setError("Ingrese su nombre")
            return
        } if (nuevoUsuario.apellido === "") {
            setError("Ingrese su apellido")
            return
        } if (nuevoUsuario.numero === "") {
            setError("Ingrese su numero")
            return
        } if (nuevoUsuario.email === "") {
            setError("Ingrese su email")
            return
        } if (!regexParaEmail.test(nuevoUsuario.email)) {
            setError("Ingrese un email válido")
            return
        } if (nuevoUsuario.contraseña === "") {
            setError("Ingrese su contraseña")
            return
        } if (!regexPas.test(nuevoUsuario.contraseña)) {
            setError("Ingrese un mínimo de 8 caracteres y un máximo de 15 , al menos una letra minúscula, al menos una letra mayúscula, al menos 1 dígito (número), al menos 1 caracter especial, que no existan espacios en blanco.")
            return
        } if (nuevoUsuario.contraseña !== nuevoUsuario.confirmarContraseña) {
            setError("Las contraseñas no coinciden")
            return
        }
        //Se elimina el mensaje de error
        setError("")
        setSucces("Registro exitoso")

        console.log('Datos del nuevo usuario:', nuevoUsuario);
    }



    return (
        <div>
            <h1>Regístrate</h1>
            <div className='container-form'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Nombre
                            <input type="text" name='nombre' onChange={handleChange} value={nuevoUsuario.nombre} placeholder='Nombre' />
                        </label>
                        <label>
                            Apellido
                            <input type="text" name='apellido' onChange={handleChange} value={nuevoUsuario.apellido} placeholder='Apellido' />
                        </label>
                    </div>
                    <div>
                        <label >
                            Número de teléfono
                            <div className='telefono'>
                                <p>+56 9</p>
                                <input type="number" name='numero' onChange={handleChange} value={nuevoUsuario.numero} />
                            </div>
                        </label>
                        <label>
                            Email
                            <input type="email" name='email' onChange={handleChange} placeholder='Email' value={nuevoUsuario.email} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Foto
                            <input type="file" accept='image/*' onChange={handleImageChange} />
                        </label>
                        <div>
                            {nuevoUsuario.imagen && <img src={nuevoUsuario.imagen} alt="Vehículo" className="imagen-nuevoUsuario" />}
                        </div>
                    </div>
                    <div>
                        <label>
                            Contraseña
                            <input type="password" name='contraseña' onChange={handleChange} value={nuevoUsuario.contraseña} />
                        </label>
                        <label>
                            Confirmar contraseña
                            <input type="password" name='confirmarContraseña' onChange={handleChange} value={nuevoUsuario.confirmarContraseña} />
                        </label>
                        <div className='separador'>
                            <button type='submit' className=''>Registrarse</button>
                        </div>
                        <div className='mensajeRegistro'>
                            {error.length > 0 && <h3 className="error">{error}</h3>}
                            {succes.length > 0 && <h3 className="succes">{succes}</h3>}
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )



}

export default Registro