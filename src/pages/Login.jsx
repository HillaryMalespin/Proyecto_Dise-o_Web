import React from "react";
import "../styles/login.css"; // importa solo lo específico de login
import "../styles/override.css"; // estilos globales (centrado, card, botón, etc.)
import { post } from "../conection/ApiInterface";
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import { useState } from "react";
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
    const result = await post('/login', {
      email: e.target.email.value,
      password: e.target.password.value
    });
    if (result.success) {
      navigate("/dashboard");
    } else {
      setType("error");
      setErrorMessage("Error: " + result.message);
      setShowError(true);
    }
    setLoading(false);
  };

  return (
    <main className="login-wrapper" aria-label="Pantalla de inicio de sesión">
      <section className="card login-card" aria-label="Tarjeta con formulario de inicio de sesión">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form
          className="login-form"
          onSubmit={handleSubmit}
          aria-label="Formulario de inicio de sesión"
        >
          {/* Correo */}
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="Correo electrónico"
            required
            aria-label="Campo de correo electrónico"
          />

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Contraseña"
            required
            aria-label="Campo de contraseña"
          />

          {/* Botón */}
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Enviar formulario e iniciar sesión"
          >
            Entrar
          </button>
        </form>

        <p className="login-extra">
          ¿No tienes cuenta?{" "}
          <a href="/register" aria-label="Ir a la página de registro">Regístrate</a>
        </p>
        <p className="login-extra">
          <a href="/recover-password" aria-label="Ir a recuperar contraseña">¿Olvidaste tu contraseña?</a>
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
