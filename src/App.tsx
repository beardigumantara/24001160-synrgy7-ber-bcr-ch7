import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CarsPage from './pages/cars/carsPage'
import Home from './pages/home/home'
import './App.css'
import Admin from './pages/admin/admin'
import Login from './pages/auth/login'
import Protected from './components/protected'
import Register from './pages/auth/register'
import CreateCar from './pages/admin/createCar'
import EditCar from './pages/admin/editCar'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='cars' element={<CarsPage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route 
          path='/admin/cars' 
          element={
            <Protected>
              <Admin/>
            </Protected>}>
            <Route path='/admin/cars/create' element={<CreateCar />}/>
            <Route path='/admin/cars/edit/:id' element={<EditCar/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
