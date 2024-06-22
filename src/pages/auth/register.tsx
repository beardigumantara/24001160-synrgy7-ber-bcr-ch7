import React, { useState } from "react";
import styles from "./login.module.css";
import background from "../../assets/images/image 2.png";
import { useNavigate } from "react-router-dom";

async function registerUser(name: string, email: string, password: string) {
  console.log({ name, email, password });
  // Use your own endpoint
  const response = await fetch(
    "http://localhost:8000/api/users/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Error registering user");
  }
  const data = await response.json();

  return data;
}
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    registerUser(name, email, password)
      .then((data) => {
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="d-flex flex-lg-row">
      <div className={styles.containerImg}>
        <img src={background} alt="background" />
      </div>
      <div className={styles.container}>
        <a href="" className={styles.logo}>
          <span>BCR</span>
        </a>
        <h1>Register BCR</h1>
        <div className={styles.formLogin}>
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Email</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <a href="/login">already have an account</a>
          </div>
        </div>
        <button
          onClick={handleRegister}
          disabled={isLoading}
          id={styles.btnBlue}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Registration successful!</p>}
      </div>
    </div>
  );
};

export default Register;
