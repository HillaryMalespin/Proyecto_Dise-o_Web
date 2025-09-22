import React from "react";

import "../styles/override.css";
import "../styles/home.css";

export default function Home() {
  return (
    <main className="home-wrapper">
      <section className="home-card">
        <h1 className="home-title">Bienvenido a Mi Proyecto</h1>
        <p className="home-subtitle">
          Esta es tu página de inicio. Aquí puedes navegar a las secciones de{" "}
          <strong>Registro</strong> o <strong>Login</strong>.
        </p>

        <div className="home-actions">
          <a href="/register" className="btn btn-primary">
            Crear Cuenta
          </a>
          <a href="/login" className="btn btn-secondary">
            Iniciar Sesión
          </a>
        </div>
      </section>
    </main>
  );
}
