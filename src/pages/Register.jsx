import React from "react";

// Importar estilos globales y específicos
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/component.css";
import "../styles/override.css";
import "../styles/register.css";

const Register = () => {
  return (
    <main className="register-wrapper">
      <section className="card register-card">
        <h1 className="register-title">Crear Cuenta</h1>
        <form className="register-form" aria-label="Formulario de registro">
          <label htmlFor="fullname">Nombre completo</label>
          <input
            id="fullname"
            type="text"
            placeholder="Nombre completo"
            className="input"
            aria-required="true"
            required
          />

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="input"
            aria-required="true"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="input"
            aria-required="true"
            required
          />

          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirmar contraseña"
            className="input"
            aria-required="true"
            required
          />

          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>

        <p className="register-link">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="link">
            Inicia sesión
          </a>
        </p>
      </section>
    </main>
  );
};

export default Register;
