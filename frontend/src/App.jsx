import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Inicio from './veiws/Inicio/Inicio'
import Vehiculos from './veiws/Vehiculos/Vehiculos'
import Registro from './veiws/Registro/Registro'
import Login from './veiws/Login/Login'
import PublicarAviso from './veiws/PublicarAviso/PublicarAviso'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/vehiculos' element={<Vehiculos />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/publicar' element={<PublicarAviso />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
