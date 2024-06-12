import './App.css'
import { Routes, Route } from 'react-router-dom'
import Inicio from './veiws/Inicio/Inicio'
import Vehiculos from './veiws/Vehiculos/Vehiculos'
import Registro from './veiws/Registro/Registro'
import Login from './veiws/Login/Login'
import PublicarAviso from './veiws/PublicarAviso/PublicarAviso'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/vehiculos' element={<Vehiculos />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/publicar' element={<PublicarAviso />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App
