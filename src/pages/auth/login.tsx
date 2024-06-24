import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/images/image 2.png";
import styles from "./login.module.css";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

async function doLogin({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
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

  return { token: data.token, role: data.role };
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogin = () => {
    setIsLoading(true);
    doLogin({ email, password })
      .then(({ token, role }) => {
        localStorage.setItem("token", token);
        console.log("role", role);
        if (role === "superadmin") {
          navigate("/admin/cars");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
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
        <h1>Welcome, Admin BCR</h1>
        <div className={styles.formLogin}>
          <p>Email</p>
          <input
            type="text"
            placeholder="Contoh: johndee@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="6+ karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <a href="/register">Don't have an account, Register</a>
          </div>
        </div>
        <button onClick={handleLogin} disabled={isLoading} id={styles.btnBlue}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
