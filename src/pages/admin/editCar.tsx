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
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const getCarId = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/cars/${id}`);
        console.log("response", response.data);

        setCar(response.data.car); // Updated this line
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

      const formData = new FormData();
      formData.append("name", car.name);
      formData.append("price", car.price);
      formData.append("start_rent", car.startRent); // Updated to "start_rent"
      formData.append("finish_rent", car.finishRent); // Updated to "finish_rent"
      formData.append("availability", car.availability);
      if (file) {
        formData.append("image", file);
      }

      const response = await axios.put(`http://localhost:8000/api/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
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
      <div>
        <label>Current Image:</label>
        <img src={car.image} alt="Current car" style={{ width: '200px', height: 'auto' }} />
      </div>
      <input 
        type="file"
        name="image"
        onChange={handleFileChange} // Removed value attribute
      />
      <div>
        <label>Start Rent:</label>
        <input
          type="date"
          name="startRent"
          value={car.startRent ? car.startRent.split('T')[0] : ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Finish Rent:</label>
        <input
          type="date"
          name="finishRent"
          value={car.finishRent ? car.finishRent.split('T')[0] : ""}
          onChange={handleChange}
        />
      </div>
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
