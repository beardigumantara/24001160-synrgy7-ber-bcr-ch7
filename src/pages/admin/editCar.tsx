import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Car {
  id: number;
  name: string;
  price: string;
  startRent: string;
  finishRent: string;
  availability: string;
  image: string;
}

const EditCar: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const getCarId = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cars/${id}`);
        console.log("response", response.data);
        
        setCar(response.data.cars);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCarId();
  }, [id]);

  const handleEditCar = async () => {
    if (!car) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized");
      }

      const response = await axios.put(`http://localhost:8000/api/cars/${id}`, car, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true);
      console.log(response.data);
      navigate("/admin/cars");
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar((prevCar) => (prevCar ? { ...prevCar, [name]: value } : null));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!car) {
    return <p>Car not found</p>;
  }

  return (
    <div>
      <h1>Edit Car</h1>
      <input 
        type="file"
        name="image"
        value={car.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        value={car.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        value={car.price}
        onChange={handleChange}
      />
      <input
        type="date"
        name="startRent"
        value={car.startRent}
        onChange={handleChange}
      />
      <input
        type="date"
        name="finishRent"
        value={car.finishRent}
        onChange={handleChange}
      />
      <input
        type="text"
        name="availability"
        value={car.availability}
        onChange={handleChange}
      />
      <button onClick={handleEditCar}>Save Changes</button>
      {success && <p style={{ color: "green" }}>Car updated successfully</p>}
    </div>
  );
};

export default EditCar;
