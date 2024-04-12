import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const redirect = useNavigate();
  
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("1tUiRs2mLSNQ98o");


  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/login`, {
      username: userName,
      password: password,
    });

    if (res.status !== 200) throw new Error("Cant Login!");
    const token = res.data.token;
    sessionStorage.setItem("token", token);

    redirect("/");
    window.location.reload();
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}
