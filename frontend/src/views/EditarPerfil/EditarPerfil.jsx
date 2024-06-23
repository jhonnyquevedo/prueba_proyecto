import './EditarPerfil.css'
import { useState } from 'react'

function EditarPerfil() {

  //Expresión regular para validar que el campo de email contenga el formato adecuado
  const regexParaEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  //Expresión regular para validar el campo de contraseña solicita un mínimo de 8 caracteres y un máximo de 15 , al menos una letra minúscula, al menos una letra mayúscula, al menos 1 dígito (número), al menos 1 caracter especial, que no existan espacios en blanco y al menos 1 símbolo para más seguridad fuente https://es.stackoverflow.com/questions/4300/expresiones-regulares-para-contrase%C3%B1a-en-base-a-una-politica.
  const regexPas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.-])[A-Za-z\d$@$!%*?&.-]{8,15}$/;

  const [error, setError] = useState("")
  const [succes, setSucces] = useState("")

  //falta hacer las validaciones con regex para email y contraseña
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: 'Juan',
    apellido: 'Perez',
    telefono: '',
    email: '',
    imagen: null,
    contraseña: '',
    confirmarContraseña: ''
  })





  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'telefono') {
      if (value.startsWith('')) {
        if (value.length <= 9) {
          setNuevoUsuario({ ...nuevoUsuario, telefono: value });
        }
      } else if (value.startsWith('')) {
        setNuevoUsuario({ ...nuevoUsuario, telefono: '' });
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
    <div className="contenedor-editar-perfil">
      <h1 className="titulo-editar-perfil">Registro de usuario</h1>
      <form className='formulario-editar-perfil' onSubmit={handleSubmit}>
        <div className="campo-editar">
          <label className='label-editar'>Nombre</label>
          <input className='input-editar'
            type="text"
            name="nombre"
            value={nuevoUsuario.nombre}
            onChange={handleChange}
            disabled

          />
        </div>
        <div className="campo-editar">
          <label className='label-editar'>Apellido</label>
          <input className='input-editar'
            type="text"
            name="apellido"
            value={nuevoUsuario.apellido}
            onChange={handleChange}
            disabled

          />
        </div>

        <div className="campo-editar">
          <label className='label-editar'>codigo</label>
          <input className='input-editar'
            name="codigo"
            type='text'
            value="+56"
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="campo-editar">
          <label className='label-editar'>Teléfono</label>
          <input className='input-editar'
            type="tel"
            name="telefono"
            value={nuevoUsuario.telefono}
            onChange={handleChange}
            title="Debe tener 9 dígitos"
            pattern="[0-9]{9}"

          />
        </div>
        <div className="campo-editar">
          <label className='label-editar'>Email</label>
          <input className='input-editar'
            type="email"
            name="email"
            value={nuevoUsuario.email}
            onChange={handleChange}

          />
        </div>

        <div className='campo-editar'>
          <label className='label-editar'> Contraseña</label>
          <input className='input-editar'
            type="password"
            name='contraseña'
            value={nuevoUsuario.contraseña}
            onChange={handleChange}

          />


        </div>

        <div className='campo-editar'>
          <label className='label-editar'>Confirmar contraseña</label>
          <input className='input-editar'
            type="password"
            name='confirmarContraseña'
            value={nuevoUsuario.confirmarContraseña}
            onChange={handleChange}

          />

        </div>

        <div className="campo-editar">
          <label className='label-editar'>Imagen de perfil</label>
          <input className='input-editar'
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {nuevoUsuario.foto && <img src={nuevoUsuario.foto} alt="Imagen de perfil" className="imagen-editar" />}
        </div>
        <div className="boton-editar-perfil">
          <button className="boton-guardar-editar"
            type="submit"> Registrarse
          </button>
        </div>
        <div className='mensajeEditar'>
          {error.length > 0 && <h3 className="error">{error}</h3>}
          {succes.length > 0 && <h3 className="succes">{succes}</h3>}
        </div>



      </form>
    </div>
  )



}

export default EditarPerfil;