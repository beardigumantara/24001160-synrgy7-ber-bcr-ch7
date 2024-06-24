import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarsPage from "./pages/cars/carsPage";
import Home from "./pages/home/home";
import "./App.css";
import Admin from "./pages/admin/admin";
import Login from "./pages/auth/login";
import Protected from "./components/protected";
import Register from "./pages/auth/register";
import CreateCar from "./pages/admin/createCar";
import EditCar from "./pages/admin/editCar";
import CarAdmin from "./pages/admin/carAdmin";
import { AdminProvider } from "./context/admin";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cars" element={<CarsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <Protected>
                <Admin />
              </Protected>
            }
          />
          <Route
            path="/admin/cars"
            element={
              <Protected>
                <CarAdmin />
              </Protected>
            }
          />
          <Route
            path="/admin/cars/create"
            element={
              <Protected>
                <CreateCar />
              </Protected>
            }
          />
          <Route
            path="/admin/cars/edit/:id"
            element={
              <Protected>
                <EditCar />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
