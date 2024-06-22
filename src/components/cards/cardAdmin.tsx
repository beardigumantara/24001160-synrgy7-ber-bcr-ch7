/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const response = await fetch("http://localhost:4000/cars");
      const data = await response.json();
      setCars(data);
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

  return (
    <div>
      <h1>Cars</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <h2>{car.name}</h2>
            <p>Price: {car.price}</p>
            <p>Start Rent: {car.startRent}</p>
            <p>Finish Rent: {car.finishRent}</p>
            <p>Availability: {car.availability}</p>
            <img src={car.image} alt={car.name} />
          </li>
        ))}
      </ul>
    </div>
  )
 
}

export default CardAdmin;