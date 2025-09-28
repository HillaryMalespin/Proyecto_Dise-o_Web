import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Accounts from "./pages/Accounts.jsx";       
import AccountDetail from "./pages/AccountDetail";
import Cards from "./pages/Cards.jsx";
import RecoverPassword from "./pages/recoverPassword/RecoverPassword.jsx";
import { useState } from "react";

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      {/* Navbar fijo */}
      <div className="smartphone-navbar navbar">
        <div className={`logo`}>
          <Link to="/" className="btn-link">BancoDigital</Link>
        </div>
        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/" className="btn-link">Inicio</Link></li>
            <li><a href="#about">Quiénes somos</a></li>
            <li><a href="#help">Ayuda</a></li>
            <li><a href="#terms">Términos</a></li>
            <li><a href="#privacy">Privacidad</a></li>
            <li><Link to="/login" className="btn-link">Iniciar Sesión</Link></li>
            <li><Link to="/register" className="btn-primary">Registrarse</Link></li>
          </ul>
        </nav>
        <button
          className={`button-menu-toggle`}
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Aquí se muestran las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} /> 
        <Route path="/accounts/:accountId" element={<AccountDetail />} />
        <Route path="/accounts/:id" element={<AccountDetail />} /> 
        <Route path="/cards" element={<Cards />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>

      <footer className="footer">
        <p>© 2025 Banco Digital. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
