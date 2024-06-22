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
        telefono: '+56',
        email: '',
        imagen: null,
        contraseña: '',
        confirmarContraseña: ''
    })



    const handleChange = (event) => {
      const { name, value } = event.target;

      if (name === 'nombre' || name === 'apellido') {
        const regexSoloLetras = /^[a-zA-Z\s]*$/;
        if (!regexSoloLetras.test(value)) {
            setError("Solo se permiten letras en los campos de nombre y apellido");
            return;
        }
    }

    if (name === 'telefono') {
      if (value.startsWith('+56 ')) {
        if (value.length <= 13) {
            setNuevoUsuario({ ...nuevoUsuario, telefono: value });
        }
      } else if (value.startsWith('+56')) {
        setNuevoUsuario({ ...nuevoUsuario, telefono: '+56 ' });
      }
    } else {
        setNuevoUsuario({ ...nuevoUsuario, [name]: value });
    }
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
        } if (nuevoUsuario.telefono === "") {
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
        <div className="contenedor-registro">
      <h1 className="titulo-registro">Registro de usuario</h1>
      <form className='formulario-registro' onSubmit={handleSubmit}>
        <div className="campo-registro">
          <label className='label-registro'>Nombre</label>
          <input className='input-registro'
            type="text"
            name="nombre"
            value={nuevoUsuario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo-registro">
          <label className='label-registro'>Apellido</label>
          <input className='input-registro'
            type="text"
            name="apellido"
            value={nuevoUsuario.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo-registro">
          <label className='label-registro'>Email</label>
          <input className='input-registro'
            type="email"
            name="email"
            value={nuevoUsuario.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="campo-registro">
          <label className='label-registro'>Teléfono</label>
          <input className='input-registro'
            type="tel"
            name="telefono"
            value={nuevoUsuario.telefono}
            onChange={handleChange}
            pattern="^\+56\s\d{9}$" 
            title="Debe empezar con +56 seguido de 9 dígitos"
            required
          />
        </div>
        <div className="campo-registro">
          <label className='label-registro'>Imagen de perfil</label>
          <input className='input-registro'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {nuevoUsuario.foto && <img src={nuevoUsuario.foto} alt="Imagen de perfil" className="imagen-registro" />}
        </div>
        <div className="boton-registro">
        <button type="submit" className="boton-guardar-registro">
          Guardar
        </button>
        </div>
      </form>
    </div>
    )



}

export default Registro