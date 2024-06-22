/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


interface Car {
  id: number;
  name: string;
  price: number;
  start_rent: string;
  finish_rent: string;
  availability: boolean;
  image: string;
  deleted_by: number | null;
}

const CardAdmin: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


 useEffect(() => {
   const getCar = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/cars");
      console.log("response", response.data);
      const filteredCars = response.data.cars.filter((car: Car) => car.deleted_by === null);
      setCars(filteredCars);
    } catch (err : any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
   }
    getCar();
    
    console.log("cars", cars);
    
 }, [])

 if (isLoading) {
   return <h1>Loading...</h1>;
 }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const handleDeleteCar = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized");
      }

      await axios.delete(`http://localhost:8000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
    } catch (err : any) {
      console.error(err);
    }
  }

  const handleEditCar = (id: number) => {
    navigate(`/admin/cars/edit/${id}`);
  }

  return (
    <div>
      <h1>Cars</h1>
      <ul>
      {cars.map((car) => (
          <div key={car.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", width: "200px" }}>
            <img src={car.image} alt={car.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h2>{car.name}</h2>
            <p>Price: {car.price}</p>
            <p>Available: {car.availability.toString()}</p>
            <p>Start Rent: {car.start_rent}</p>
            <p>Finish Rent: {car.finish_rent}</p>
            <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
            <button onClick={() => handleEditCar(car.id)}>Edit</button>
          </div>
        ))}
      </ul>
    </div>
  )
 
}

export default CardAdmin;