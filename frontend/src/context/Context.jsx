import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // autenticacion provisional del navbar
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //http://localhost:3000
    // peticion para conseguir toda la data de vehiculos
    const [dataCompletaVehiculos, setDataCompletaVehiculos] = useState([])
    const getDataVehiculos = async () => {
        
        try {
            const urlApi = 'https://prueba-proyecto-5xac.onrender.com/vehiculos'
            const res = await fetch(urlApi)
            const dataApi = await res.json()
            setDataCompletaVehiculos(dataApi)
        } catch (error) {
            console.log("hay un error", error)
        }
    }

    // peticion para recibir los estados disponibles
    const [estados, setEstado] = useState([])
    const getDataEstado = async () => {
        try {
            const res = await fetch('https://prueba-proyecto-5xac.onrender.com/estados')
            const dataEstados = await res.json()
            setEstado(dataEstados)
        } catch (error) {
            console.log("no se pudo conectar con el servidor")
        }

    }

    // peticion para recibir las marcas disponibles
    const [marcas, setMarcas] = useState([])
    const getDataMarca = async () => {
        try {
            const res = await fetch('https://prueba-proyecto-5xac.onrender.com/marcas')
            const dataMarcas = await res.json()
            setMarcas(dataMarcas)
        } catch (error) {
            console.log("no se pudo conectar con el servidor")
        }
    }

    // peticion para recibir las categorias disponibles
    const [categorias, setCategroria] = useState([])
    const getDataCategoria = async () => {
        try {
            const res = await fetch('https://prueba-proyecto-5xac.onrender.com/categorias')
            const dataCategorias = await res.json()
            setCategroria(dataCategorias)
        } catch (error) {

        }
    }

    //peticion para recibir las categorias
    const [transmisiones, setTransmisiones] = useState([])
    const getDataTransmision = async () => {
        try {
            const res = await fetch('https://prueba-proyecto-5xac.onrender.com/transmisiones')
            const dataTransmisiones = await res.json()
            setTransmisiones(dataTransmisiones)
        } catch (error) {
            
        }
    }

    //peticion para recibir los modelos
    const [modelos, setModelos] = useState([])
    const getDataModelos = async (marcaOpcion) => {
        const id = marcaOpcion
        const url = `https://prueba-proyecto-5xac.onrender.com/modelos/${id}`
        console.log(url)
        try {
            const res = await fetch(url)
            const dataModelo = await res.json()
            setModelos(dataModelo)
        } catch (error) {
            console.log("no se pudo conectar con el servidor")
        }
    }

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };


    return (
        <AuthContext.Provider value={{getDataModelos, modelos, isAuthenticated, login, logout, getDataEstado, estados, getDataVehiculos, setDataCompletaVehiculos, dataCompletaVehiculos, getDataMarca, marcas, getDataCategoria, categorias, getDataTransmision, transmisiones }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
// export const useAuth = () => useContext(AuthContext);
