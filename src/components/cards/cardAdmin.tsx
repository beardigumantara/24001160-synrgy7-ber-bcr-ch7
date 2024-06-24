/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cardAdmin.module.css";
import icon from "../../assets/images/Rectangle 9.png";

interface Car {
  id: number;
  name: string;
  price: number;
  start_rent: string;
  finish_rent: string;
  availability: boolean;
  image: string;
  updated_at: string;
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
        const filteredCars = response.data.cars.filter(
          (car: Car) => car.deleted_by === null
        );
        setCars(filteredCars);
        // setCars(response.data.cars);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCar();

    console.log("cars", cars);
  }, []);

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
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleEditCar = (id: number) => {
    navigate(`/admin/cars/edit/${id}`);
  };

  return (
    <div className={styles.containerCard}>
      <p>
        Cars{" "}
        <span>
          <i className="bi bi-chevron-right"></i> List Cars
        </span>
      </p>
      <div className={styles.title}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "24px 0" }}>
          <span>
            <img src={icon} alt="" />
          </span>
          List Cars
        </h2>
        <a href="/admin/cars/create">
          <button id={styles.btnBlue}><span>+</span>Add New Car</button>
        </a>
      </div>
      <div className={styles.box}>
        {cars.map((car) => (
          <div className={styles.card} key={car.id}>
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <h2>{car.price} / hari</h2>
            <p>
              <span>
                <i className="bi bi-key"></i>
              </span>
              {car.finish_rent.substring(0, 10)} -{" "}
              {car.finish_rent.substring(0, 10)}
            </p>
            <p>
              <span>
                <i className="bi bi-clock"></i>
              </span>{" "}
              Update at {car.updated_at}
            </p>
            <button id={styles.btnDel} onClick={() => handleDeleteCar(car.id)}>
              Delete
            </button>
            <button id={styles.btnEdit} onClick={() => handleEditCar(car.id)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardAdmin;
