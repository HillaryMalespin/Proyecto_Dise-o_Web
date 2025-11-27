import React, { useState } from "react";
import "../styles/login.css";
import "../styles/override.css";
import { login } from "../services/auth";   // importa la función login
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import Loading from "./Loading";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [type, setType] = useState("error");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const username = e.target.email.value;     // el backend espera "username"
    const password = e.target.password.value;

    try {
      const res = await login(username, password);

      // El servicio login() ya guarda el token automáticamente
      navigate("/dashboard");

    } catch (err) {
      setType("error");

      // Mensaje de error exacto desde el backend WebError
      setErrorMessage("Error: " + (err.message ?? "No se pudo iniciar sesión"));
      setShowError(true);
    }

    setLoading(false);
  };

  return (
    <main className="login-wrapper" aria-label="Pantalla de inicio de sesión">
      <section className="card login-card" aria-label="Tarjeta con formulario de inicio de sesión">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Username */}
          <label htmlFor="email">Usuario</label>
          <input
            type="text"
            id="email"
            className="input"
            placeholder="Nombre de usuario"
            required
          />

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Contraseña"
            required
          />

          {/* Botón */}
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </form>

        <p className="login-extra">
          ¿No tienes cuenta?{" "}
          <a href="/register">Regístrate</a>
        </p>

        <p className="login-extra">
          <a href="/recover-password">¿Olvidaste tu contraseña?</a>
        </p>
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
