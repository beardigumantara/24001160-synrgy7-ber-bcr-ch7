import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar1 from "../../components/sidebar/sidebar1";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import styles from "./editCar.module.css";

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
        const response = await axios.get(
          `http://localhost:8000/api/cars/${id}`
        );
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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

      const response = await axios.put(
        `http://localhost:8000/api/cars/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    <div
      className="d-flex flex-row"
      style={{ backgroundColor: "#F4F5F7", height: "100vh" }}
    >
      <Sidebar1 />
      <div>
        <div
          className="d-flex flex-row justify-content-between align-items-center"
          style={{
            height: "70px",
            width: "1230px",
            backgroundColor: "#FFFFFF",
            boxShadow: "2px 10px 18px #EBEFF5",
          }}
        >
          <NavbarAdmin />
          <button onClick={handleLogout} id={styles.btnBlue}>
            Logout
          </button>
        </div>
        <div className={styles.containerEdit}>
          <p>
            Cars{" "}
            <span>
              <i className="bi bi-chevron-right"></i> List Cars
            </span>
            <span>
              <i className="bi bi-chevron-right"></i> Edit Car
            </span>
          </p>
          <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "24px 0" }}>
            Edit Car
          </h2>
          <div className={styles.edit}>
            <div>
              <label>Nama</label>
              <input
                type="text"
                name="name"
                value={car.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Harga</label>
              <input
                type="text"
                name="price"
                value={car.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Availability</label>
              <select
                name="availability"
                value={car.availability}
                onChange={handleChange}
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
            <div>
              <label>Foto</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange} // Removed value attribute
              />
            </div>
            <div>
              <label>Start Rent</label>
              <input
                type="date"
                name="startRent"
                value={car.startRent ? car.startRent.split("T")[0] : ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Finish Rent</label>
              <input
                type="date"
                name="finishRent"
                value={car.finishRent ? car.finishRent.split("T")[0] : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <a href="/admin/cars">
            <button id={styles.btnWhite}>Cancel</button>
          </a>
          <button onClick={handleEditCar} id={styles.btnBlue}>Save</button>
          {success && (
            <p style={{ color: "green" }}>Car updated successfully</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCar;
