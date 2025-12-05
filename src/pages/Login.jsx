// Login.jsx
import React, { useState } from "react";
import "../styles/login.css";
import "../styles/override.css";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import Loading from "./Loading";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const username = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await login(username, password);
      const token = res.token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log("JWT decodificado:", decoded);

      // GUARDAR USUARIO CON EL ID NECESARIO PARA ACCOUNTS
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: decoded.id,     // ← IMPORTANTE
          email: decoded.email,
          role: decoded.role
        })
      );

      navigate("/Dashboard");

    } catch (err) {
      setType("error");
      setErrorMessage("Error: " + (err.message ?? "No se pudo iniciar sesión"));
      setShowError(true);
    }

    setLoading(false);
  };

  return (
    <main className="login-wrapper">
      <section className="card login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          
          <label htmlFor="email">Usuario</label>
          <input type="text" id="email" className="input" required />

          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="input" required />

          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </form>
      </section>

      <MessageBox
        message={errorMessage}
        type={type}
        visible={showError}
        onClose={() => setShowError(false)}
      />
      
      <Loading visible={loading} />
    </main>
  );
}
