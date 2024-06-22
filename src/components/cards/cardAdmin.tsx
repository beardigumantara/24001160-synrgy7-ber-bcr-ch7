/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, {useEffect, useState} from "react";


interface Car {
  id: number;
  name: string;
  price: number;
  startRent: string;
  finishRent: string;
  availability: string;
  image: string;
}

const CardAdmin: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


 useEffect(() => {
   const getCar = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/cars");
      setCars(response.data);
    } catch (err : any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
   }
    getCar();
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

  return (
    <div>
      <h1>Cars</h1>
      <ul>
      {cars.map((car) => (
          <div key={car.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", width: "200px" }}>
            <img src={car.image} alt={car.name} style={{ width: "100%", borderRadius: "8px" }} />
            <h2>{car.name}</h2>
            <p>Price: {car.price}</p>
            <p>Available: {car.availability}</p>
            <p>Start Rent: {car.startRent}</p>
            <p>Finish Rent: {car.finishRent}</p>
            <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  )
 
}

export default CardAdmin;