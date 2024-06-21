import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CarsPage from './pages/cars/carsPage'
import Home from './pages/home/home'
import './App.css'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='cars' element={<CarsPage />}/>
      </Routes>
    </Router>
  )
}

export default App
