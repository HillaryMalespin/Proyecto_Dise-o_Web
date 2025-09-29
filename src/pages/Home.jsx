import React from "react";
import "../styles/home.css";
/*import "../styles/override.css";*/

export default function Home() {
  return (
    <div className="home" aria-label="Página de inicio Banco Digital">
      {/* Navbar */}

      {/* Hero */}
      <section className="hero" aria-label="Sección principal con llamado a la acción">
        <div className="hero-content">
          <h2>Tu banco digital de confianza</h2>
          <p>
            Gestiona tus cuentas, realiza transferencias y accede a productos
            financieros de manera rápida y segura desde cualquier lugar.
          </p>
          <a
            href="/register"
            className="btn-primary"
            aria-label="Abrir una cuenta nueva"
          >
            Abre tu cuenta
          </a>
        </div>
      </section>

      {/* Servicios */}
      <section className="services" aria-label="Productos y servicios">
        <h3>Productos y servicios</h3>
        <div className="card-grid" aria-label="Lista de productos">
          <article className="card" aria-label="Cuentas de ahorro">
            <h4>Cuentas de ahorro</h4>
            <p>Administra tu dinero de forma segura y gana intereses.</p>
            <a
              href="#ahorro"
              className="btn-link2"
              aria-label="Ver más información sobre cuentas de ahorro"
            >
              Ver más
            </a>
          </article>

          <article className="card" aria-label="Tarjetas de crédito">
            <h4>Tarjetas de crédito</h4>
            <p>Obtén beneficios exclusivos en compras nacionales e internacionales.</p>
            <a
              href="#credito"
              className="btn-link2"
              aria-label="Solicitar tarjeta de crédito"
            >
              Solicitar
            </a>
          </article>

          <article className="card" aria-label="Préstamos personales">
            <h4>Préstamos personales</h4>
            <p>Accede a financiamiento flexible con tasas preferenciales.</p>
            <a
              href="#prestamos"
              className="btn-link2"
              aria-label="Simular préstamo personal"
            >
              Simular préstamo
            </a>
          </article>

          <article className="card" aria-label="Inversiones">
            <h4>Inversiones</h4>
            <p>Haz crecer tu dinero con opciones de inversión seguras.</p>
            <a
              href="#inversiones"
              className="btn-link2"
              aria-label="Explorar opciones de inversión"
            >
              Invertir
            </a>
          </article>
        </div>
      </section>

      {/* Confianza */}
      <section className="trust" aria-label="Confianza y seguridad">
        <h3>Confianza y seguridad</h3>
        <ul aria-label="Beneficios de seguridad">
          <li>✅ Transacciones 100% seguras</li>
          <li>✅ Soporte 24/7</li>
          <li>✅ Certificación internacional en seguridad digital</li>
        </ul>
      </section>

      {/* Testimonios */}
      <section className="testimonials" aria-label="Testimonios de clientes">
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="testimonial-grid" aria-label="Listado de testimonios">
          <blockquote aria-label="Testimonio de María G.">
            "Puedo hacer mis transferencias en segundos, sin complicaciones."
            <footer>- María G.</footer>
          </blockquote>
          <blockquote aria-label="Testimonio de Juan P.">
            "Me siento segura sabiendo que mis datos están protegidos."
            <footer>- Juan P.</footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
