/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import React, { useEffect, useState } from "react";
import icon from "../../assets/images/Rectangle 9.png";
import styles from "./tableCars.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Car {
  id: number;
  name: string;
  price: number;
  start_rent: string;
  finish_rent: string;
  availability: boolean;
  created_at: string;
  updated_at: string;
  deleted_by: number | null;
}

const TableCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [_isLoading, setIsLoading] = useState<boolean>(false);
  const [_error, setError] = useState<string | null>(null);

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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCar();

    console.log("cars", cars);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.containerTable}>
      <p>
        Dashboard{" "}
        <span>
          <i className="bi bi-chevron-right"></i> Dashboard
        </span>
      </p>
      <h1>Dashboard</h1>
      <div className={styles.formTable}>
        <h2>
          <span>
            <img src={icon} alt="" />
          </span>
          List Cars
        </h2>
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Start Rent</th>
              <th>Finish Rent</th>
              <th>Availability</th>
              <th>Created at</th>
              <th>Updated at</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.price}</td>
                <td>{car.start_rent.substring(0, 10)}</td>
                <td>{car.finish_rent.substring(0, 10)}</td>
                <td>{car.availability ? "Available" : "Not Available"}</td>
                <td>{car.created_at.substring(0, 10)}</td>
                <td>{car.updated_at.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button><i className="bi bi-chevron-left"></i> previous</button>
        <button>next<i className="bi bi-chevron-right"></i></button>
      </div>
    </div>
  );
};

export default TableCars;
