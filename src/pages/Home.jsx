import React from "react";
import "../styles/home.css";
/*import "../styles/override.css";*/

export default function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <header className="navbar" role="navigation" aria-label="main navigation">
       
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h2>Tu banco digital de confianza</h2>
          <p>
            Gestiona tus cuentas, realiza transferencias y accede a productos
            financieros de manera rápida y segura desde cualquier lugar.
          </p>
          <a href="/register" className="btn-primary">Abre tu cuenta</a>
        </div>
      </section>

      {/* Servicios */}
      <section className="services">
        <h3>Productos y servicios</h3>
        <div className="card-grid">
          <article className="card">
            <h4>Cuentas de ahorro</h4>
            <p>Administra tu dinero de forma segura y gana intereses.</p>
            <a href="#ahorro" className="btn-link2">Ver más</a>
          </article>
          <article className="card">
            <h4>Tarjetas de crédito</h4>
            <p>Obtén beneficios exclusivos en compras nacionales e internacionales.</p>
            <a href="#credito" className="btn-link2">Solicitar</a>
          </article>
          <article className="card">
            <h4>Préstamos personales</h4>
            <p>Accede a financiamiento flexible con tasas preferenciales.</p>
            <a href="#prestamos" className="btn-link2">Simular préstamo</a>
          </article>
          <article className="card">
            <h4>Inversiones</h4>
            <p>Haz crecer tu dinero con opciones de inversión seguras.</p>
            <a href="#inversiones" className="btn-link2">Invertir</a>
          </article>
        </div>
      </section>

      {/* Confianza */}
      <section className="trust">
        <h3>Confianza y seguridad</h3>
        <ul>
          <li>✅ Transacciones 100% seguras</li>
          <li>✅ Soporte 24/7</li>
          <li>✅ Certificación internacional en seguridad digital</li>
        </ul>
      </section>

      {/* Testimonios */}
      <section className="testimonials">
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="testimonial-grid">
          <blockquote>
            "Puedo hacer mis transferencias en segundos, sin complicaciones."
            <footer>- María G.</footer>
          </blockquote>
          <blockquote>
            "Me siento segura sabiendo que mis datos están protegidos."
            <footer>- Juan P.</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
