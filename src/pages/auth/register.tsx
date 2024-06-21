import React, { useState } from "react";

async function registerUser(name: string, email: string, password: string) {
  console.log({ name, email, password });
  // Use your own endpoint
  const response = await fetch("http://localhost:8000/api/users/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok){
    throw new Error("Error registering user");
  }
  const data = await response.json();

  return data;
}
const Register: React.FC = () => {
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
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister} disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Registration successful!</p>}
    </div>
  )
}

export default Register;