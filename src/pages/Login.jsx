import React from "react";
import "../styles/login.css"; // importa solo lo específico de login
import "../styles/override.css"; // estilos globales (centrado, card, botón, etc.)

export default function Login() {
  return (
    <main className="login-wrapper">
      <section className="card login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className="login-form">
          {/* Correo */}
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="Correo electrónico"
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
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
        <p className="login-extra">
          <a href="/recover-password">¿Olvidaste tu contraseña?</a>
        </p>
      </section>
    </main>
  );
}
