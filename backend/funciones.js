const { pool } = require("./database.js")

const verificarUsuario = async (email) => {
    const consulta = `SELECT * FROM usuarios WHERE email = $1;`
    const values = [email]
    const { rows, rowCount } = await pool.query(consulta, values)
    if (!rowCount) {
        throw {
            code: 404,
            message: `El usuario ${email} no existe`
        }
    } else {
        return rows[0]
    }
}

const getDataMisPub = async (id_usuario, usuario) => {
    const consulta = "SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.a¤o AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado WHERE p.id_publicacion = $1;"
    const values = [id_usuario]
    const idANumero = parseInt(id_usuario)
    if(idANumero !== usuario.id_usuario){
        return {message: "El usuario de params no corresponde al uuario de autorizacion", code: 401}
    }
    const { rows } = await pool.query(consulta, values)
    if (rows.length = 0) {
        return { message: `el usuario no tiene publicaciones` }
    } else {
        return rows
    }
}   

module.exports = { verificarUsuario, getDataMisPub }
