const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { pool } = require("./database.js")
const { verificarUsuario, getDataMisPub, getDataPerfil, postearPub, actualizarPub } = require("./funciones.js")
const { autenticadorToken } = require("./middleware.js")
require("dotenv").config()


// levantando el servidor
const app = express()
app.listen(3000, console.log("servidor en funcionamiento"))

// middleware
app.use(express.json())
// middleware para recibir consultas cruzadas
app.use(cors())


// rutas GET

// data completa de publicaciones
const queryVehiculos = "SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.titulo AS titulo, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.year AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN  categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado"
app.get('/vehiculos', async (req, res) => {
    try {
        const consulta = `${queryVehiculos};`
        const { rows } = await pool.query(consulta)
        res.json(rows)
    } catch (error) {
        res.status(400).send("No se puede contactar a la base de datos", error)
    }
})

// data con la aplicacion de filtros
app.get('/vehiculos/filtros', async (req, res) => {
    try {
        const { estado, categoria, marca, modelo, año, transmision } = req.query
        let filtros = []
        const values = []
        const agregarFiltro = (campo, comparador, valor) => {
            values.push(valor)
            const posicion = values.length
            filtros.push(`${campo} ${comparador} $${posicion}`);
        };
        if (estado) {
            agregarFiltro("e.nombre", "=", estado)
        }
        if (categoria) {
            agregarFiltro("c.nombre", "=", categoria)
        }
        if (marca) {
            agregarFiltro("m.nombre", "=", marca)
        }
        if (modelo) {
            agregarFiltro("mo.nombre", "=", modelo)
        }
        if (año) {
            agregarFiltro("p.year", "=", año)
        }
        if (transmision) {
            agregarFiltro("t.nombre", "=", transmision)
        }
        const unionDeFiltros = filtros.length > 0 ? 'WHERE ' + filtros.join(" AND ") : '';
        const consulta = `SELECT p.id_publicacion AS publicacion_id, p.id_usuario AS usuario_id, p.titulo AS titulo, p.precio AS precio, m.nombre AS marca, mo.nombre AS modelo, p.year AS año, p.kilometraje AS kilometraje, t.nombre AS transmision, c.nombre AS categoria, e.nombre AS estado, p.descripcion AS descripcion, p.imagen AS imagen FROM publicaciones p JOIN marcas m ON p.id_marca = m.id_marca JOIN modelos mo ON p.id_modelo = mo.id_modelo JOIN transmisiones t ON p.id_transmision = t.id_transmision JOIN categorias c ON p.id_categoria = c.id_categoria JOIN estados e ON p.id_estado = e.id_estado ${unionDeFiltros};`;
        const { rows } = await pool.query(consulta, values)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

// data de marcas
app.get('/marcas', async (req, res) => {
    try {
        const consulta = "SELECT * FROM marcas;"
        const { rows } = await pool.query(consulta)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

// data de modelos segun la marca
app.get('/modelos/:id_marca', async (req, res) => {
    const { id_marca } = req.params
    const values = [id_marca]
    try {
        const consulta = `SELECT * FROM modelos WHERE id_marca = $1;`
        const { rows } = await pool.query(consulta, values)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

// data de transmisiones
app.get('/transmisiones', async (req, res) => {
    try {
        const consulta = "SELECT * FROM transmisiones;"
        const { rows } = await pool.query(consulta)
        res.json(rows[0])
    } catch (error) {
        console.log(error)
    }
})

// data de estado
app.get('/estados', async (req, res) => {
    try {
        const consulta = "SELECT * FROM estados;"
        const { rows } = await pool.query(consulta)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

//data de categoria
app.get('/categorias', async (req, res) => {
    try {
        const consulta = "SELECT * FROM categorias;"
        const { rows } = await pool.query(consulta)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

// rutas privadas
app.get("/perfil", autenticadorToken, async (req, res) => {
    const usuario = req.user
    const id_usuario = usuario.id_usuario
    console.log(id_usuario)
    const dataPerfil = await getDataPerfil(id_usuario)
    res.status(200).json({ message: 'Acceso concedido a ruta privada', dataPerfil })
})

app.get("/editar-perfil", autenticadorToken, (req, res) => {
    const usuario = req.user
    res.status(200).json({ message: 'Acceso concedido a ruta privada', usuario })
})

app.get("/publicar", autenticadorToken, (req, res) => {
    const usuario = req.user
    res.status(200).json({ message: 'Acceso concedido a ruta privada', usuario })
})

app.get("/editar-publicacion/:id_publicacion", autenticadorToken, (req, res) => {
    const usuario = req.user
    res.status(200).json({ message: 'Acceso concedido a ruta privada', usuario })
})

app.get("/mis-publicaciones", autenticadorToken, async (req, res) => {
    const usuario = req.user
    const id_usuario = usuario.id_usuario
    const dataMisPub = await getDataMisPub(id_usuario)
    console.log(dataMisPub)
    res.status(200).json({ message: 'Acceso concedido a ruta privada', usuario, dataMisPub })
})

// rutas POST

const key = process.env.LLAVESECRETA
// registrar un usuario
app.post('/registro', async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, password, foto } = req.body
        if (!nombre || !apellido || !email || !password) {
            return res.status(500).json("Faltan datos para poder realizar el registro")
        }
        const values = [nombre, apellido, email, telefono, bcrypt.hashSync(password), foto]
        const consulta = "INSERT INTO usuarios (nombre, apellido, email, telefono, password, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;"
        const { rows } = await pool.query(consulta, values)
        res.status(201).json(rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send("El usuario no se puede registrar " + error.detail)
    }
})

// loguearse
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const usuarioVerificado = await verificarUsuario(email)
        const verificarPassword = bcrypt.compareSync(password, usuarioVerificado.password)
        if (!verificarPassword) {
            throw {
                code: 401,
                message: "La contraseña es incorrecta"
            }
        } else {
            const token = jwt.sign({
                nombre: usuarioVerificado.nombre,
                apellido: usuarioVerificado.apellido,
                email: usuarioVerificado.email,
                id_usuario: usuarioVerificado.id_usuario
            }, key)
            res.status(200).send({ token })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            code: 500,
            message: "error al iniciar sesión",
            error: error.detail
        })
    }
})

// publicar
app.post('/publicar', async (req, res) => {
    try {
        const { id_usuario, titulo, precio, id_marca, id_modelo, year, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen } = req.body
        if (!id_usuario || !id_marca || !id_modelo || !id_transmision || !id_categoria || !id_estado) {
            return res.status(500).send({ message: "faltan datos para poder realizar el registro ", code: 500 })
        }
        const postPublicacion = await postearPub(id_usuario, titulo, precio, id_marca, id_modelo, year, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen)
        res.status(200).send({ message: "La publicación ha sido posteada con éxito", postPublicacion })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "No se pudo postear la publicación", code: 500 })
    }
})

// rutas PUT

// editar publicación
app.put('/editar-publicacion/:id_publicacion', async (req, res) => {
    const id_publicacion = req.params
    const { titulo, precio, id_marca, id_modelo, year, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen } = req.body
    const publicacionActualizada = await actualizarPub(id_publicacion, titulo, precio, id_marca, id_modelo, year, kilometraje, id_transmision, id_categoria, id_estado, descripcion, imagen)
    res.status(200).send({message:"la publicacion ha sido actualizada"}, publicacionActualizada)
})