import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // autenticacion provisional del navbar
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // peticion para conseguir toda la data de vehiculos
    const [dataCompletaVehiculos, setDataCompletaVehiculos] = useState([])
    const getDataVehiculos = async () => {
        try {
            const urlApi = 'http://localhost:3000/vehiculos'
            const res = await fetch(urlApi)
            const dataApi = await res.json()
            console.log("esta es la data", dataApi)
            setDataCompletaVehiculos(dataApi)
        } catch (error) {
            console.log("hay un error", error)
        }
    }

    // peticion para recibir los estados disponibles
    const [estados, setEstado] = useState([])
    const getDataEstado = async () => {
        try {
            const res = await fetch('http://localhost:3000/estados')
            const dataEstados = await res.json()
            //console.log(dataEstados)
            setEstado(dataEstados)
        } catch (error) {
            console.log("no se pudo conectar con el servidor")
        }

    }

    // peticion para recibir las marcas disponibles
    const [marcas, setMarcas] = useState([])
    const getDataMarca = async () => {
        try {
            const res = await fetch('http://localhost:3000/marcas')
            const dataMarcas = await res.json()
            //console.log(dataMarcas)
            setMarcas(dataMarcas)
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
        <AuthContext.Provider value={{ isAuthenticated, login, logout, getDataEstado, estados, getDataVehiculos, dataCompletaVehiculos, getDataMarca, marcas }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
// export const useAuth = () => useContext(AuthContext);
