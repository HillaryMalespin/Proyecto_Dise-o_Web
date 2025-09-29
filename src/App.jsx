import { Routes, Route, Link, useParams } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Accounts from "./pages/Accounts.jsx";       
import AccountDetail from "./pages/AccountDetail.jsx";
import Cards from "./pages/Cards.jsx";
import CardDetail from "./pages/CardDetails.jsx"; 
import RecoverPassword from "./pages/recoverPassword/RecoverPassword.jsx";
import { useState } from "react";
import PinQuery from "./pages/pinQuery/PinQuery.jsx";



function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const clickOptionNav = () => {
    setIsMenuOpen(false);
  }

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
            <li><Link to="/" className="btn-link" onClick={clickOptionNav}>Inicio</Link></li>
            <li><a href="#about" onClick={clickOptionNav}>Quiénes somos</a></li>
            <li><a href="#help" onClick={clickOptionNav}>Ayuda</a></li>
            <li><a href="#terms" onClick={clickOptionNav}>Términos</a></li>
            <li><a href="#privacy" onClick={clickOptionNav}>Privacidad</a></li>
            <li><Link to="/login" className="btn-link" onClick={clickOptionNav}>Iniciar Sesión</Link></li>
            <li><Link to="/register" className="btn-primary" onClick={clickOptionNav}>Registrarse</Link></li>
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
        
        {/* Nueva ruta para detalle de tarjeta */}
        <Route path="/card/:cardId" element={<CardDetailWrapper />} />

        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/pin-consult" element={<PinQuery />} />
      </Routes>

      <footer className="footer">
        <p>© 2025 Banco Digital. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// Wrapper para capturar params
function CardDetailWrapper() {
  const { cardId } = useParams();
  return <CardDetail cardId={cardId} />;
}

export default App;
