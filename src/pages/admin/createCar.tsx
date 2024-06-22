import React, { useState } from "react";
import axios from "axios";


const CreateCar: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [startRent, setStartRent] = useState<string>("");
  const [finishRent, setFinishRent] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [image, setImage] = useState<File| string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
    }
  }

  const handleCreateCar = async () => {
    if (!name || !price || !startRent || !finishRent || !availability || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("startRent", startRent);
    formData.append("finishRent", finishRent);
    formData.append("availability", availability);
    formData.append("image", image);

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized");
      }
      
      const response = await axios.post("http://localhost:4000/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(true);
      console.log(response.data);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err : any) {
      setError(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Create Car</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="date"
        placeholder="Start Rent"
        value={startRent}
        onChange={(e) => setStartRent(e.target.value)}
      />
      <input
        type="date"
        placeholder="Finish Rent"
        value={finishRent}
        onChange={(e) => setFinishRent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Availability"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />
      <input
        type="file"
        onChange={handleImageChange}
      />
      <button onClick={handleCreateCar}>Create Car</button>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Car created successfully</p>}
    </div>
  );
}

export default CreateCar;