import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar1 from "../../components/sidebar/sidebar1";
import NavbarAdmin from "../../components/navbar/navbarAdmin";
import styles from "./editCar.module.css";
import { AdminContext } from "../../context/admin";


const CreateCar: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [startRent, setStartRent] = useState<string>("");
  const [finishRent, setFinishRent] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [image, setImage] = useState<File | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const {handleLogout} = useContext(AdminContext);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
    }
  };

  const handleCreateCar = async () => {
    if (
      !name ||
      !price ||
      !startRent ||
      !finishRent ||
      !availability ||
      !image
    ) {
      alert("All fields are required");
      return;
    }
    // const formData = {
    //   "name" : name,
    //   "price" : price,
    //   startRent,
    //   finishRent,
    //   availability,
    //   image,
    // }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("start_rent", startRent);
    formData.append("finish_rent", finishRent);
    formData.append("availability", availability);
    formData.append("image", image);

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    console.log("form data", formData);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized");
      }
      const response = await axios.post(
        "http://localhost:8000/api/cars/create",
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
      setTimeout(() => {
        navigate("/admin/cars");
      }, 2000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
                <i className="bi bi-chevron-right"></i> Add New Car
              </span>
            </p>
            <h2
              style={{ fontSize: "20px", fontWeight: "700", margin: "24px 0" }}
            >
              Add New Car
            </h2>
            <div className={styles.edit}>
              <div>
                <label>Nama</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Harga</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label>Availability</label>
                <select
                  name="availability"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
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
                  onChange={handleImageChange} // Removed value attribute
                />
              </div>
              <div>
                <label>Start Rent</label>
                <input
                  type="date"
                  name="startRent"
                  value={startRent}
                  onChange={(e) => setStartRent(e.target.value)}
                />
              </div>
              <div>
                <label>Finish Rent</label>
                <input
                  type="date"
                  name="finishRent"
                  value={finishRent}
                  onChange={(e) => setFinishRent(e.target.value)}
                />
              </div>
            </div>
            <a href="/admin/cars">
              <button id={styles.btnWhite}>Cancel</button>
            </a>
            <button onClick={handleCreateCar} id={styles.btnBlue}>
              Save
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Car created successfully</p>}
          </div>
        </div>
      </div>
  );
};

export default CreateCar;
