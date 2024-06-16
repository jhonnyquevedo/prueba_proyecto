import './Registro.css'
import { useState } from 'react'

function Registro() {

    //falta hacer las validaciones con regex para email y contraseña
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        numero: '',
        email: '',
        imagen: null,
        contraseña: ''
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
        console.log('Datos del nuevo usuario:', nuevoUsuario);
    };

    return (
        <div>
            <h1>Regístrate</h1>
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
                    <label>
                        Número de telefono
                        <p>+56 9</p>
                        <input type="number" name='numero' onChange={handleChange} value={nuevoUsuario.numero} />
                    </label>
                    <label>
                        Email
                        <input type="text" name='email' onChange={handleChange} placeholder='Email' value={nuevoUsuario.email} />
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
                        <input type="text" name='contraseña' onChange={handleChange} value={nuevoUsuario.contraseña} />
                    </label>
                    <label>
                        Confirmar contraseña
                        <input type="text" />
                    </label>
                    <button type='submit' className=''>Registrarse</button>
                </div>
            </form>
        </div>
    )
}

export default Registro