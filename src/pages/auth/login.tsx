import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

async function doLogin({ email, password }: LoginParams): Promise<LoginResponse> {
  console.log({ email, password });
  // Use your own endpoint

  const response = await fetch("http://localhost:8000/api/users/auth/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          },
      body: JSON.stringify({
          email,
          password,
      }),
  });
  const data = await response.json();
  console.log("data", data);
  
  return {token: data.token, role: data.role};
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect (() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogin = () => {
    setIsLoading(true);
    doLogin({ email, password })
      .then(({token, role}) => {
        localStorage.setItem("token", token);
        console.log("role",role);
        if (role === "superadmin") {
          navigate("/admin/cars");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));

  }

  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="text"
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
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  )
}

export default Login;