import { Routes, Route, Link, useParams } from "react-router-dom";
import { useState } from "react";

// Páginas existentes
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Accounts from "./pages/Accounts.jsx";       
import AccountDetail from "./pages/AccountDetail.jsx";
import Cards from "./pages/Cards.jsx";
import CardDetail from "./pages/CardDetails.jsx"; 
import RecoverPassword from "./pages/recoverPassword/RecoverPassword.jsx";
import PinQuery from "./pages/pinQuery/PinQuery.jsx";
import ModalChatBot from "./pages/ModalChatBot.jsx";

import Transferencias from "./pages/Transferencias/Transferencias.jsx";
import TransferenciaForm from "./pages/Transferencias/TransferenciaForm.jsx";
import TransferenciaConfirm from "./pages/Transferencias/TransferenciaConfirm.jsx";
import TransferenciaComprobante from "./pages/Transferencias/TransferenciaComprobante.jsx";

import shootingStarsAnimation from "./assets/home/shooting_stars_animation.gif";

import { FloatButton } from 'antd';
import { WechatWorkOutlined } from '@ant-design/icons';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const clickOptionNav = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="App">
      <div className="smartphone-navbar navbar">
        <div className={`logo`}>
          <img src={shootingStarsAnimation} alt="Shooting Stars" className="logo-image" />
          <Link to="/" className="btn-link">BancoOrbita</Link>
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

      <Routes>
        {/* Rutas existentes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} /> 
        <Route path="/accounts/:accountId" element={<AccountDetail />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/card/:cardId" element={<CardDetailWrapper />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/pin-consult" element={<PinQuery />} />

        {/*rutas de transferencias */}
        <Route path="/transferencias" element={<Transferencias />} />
        <Route path="/transferencias/form" element={<TransferenciaForm />} />
        <Route path="/transferencias/confirm" element={<TransferenciaConfirm />} />
        <Route path="/transferencias/comprobante" element={<TransferenciaComprobante />} />
      </Routes>

      <footer className="footer">
        <p>© 2025 Banco Orbita. Todos los derechos reservados.</p>
      </footer>
      <FloatButton
        type="primary"
        onClick={() => setIsChatBotOpen(true)}
      />;
      {isChatBotOpen && (<ModalChatBot onClose={setIsChatBotOpen} icon={<WechatWorkOutlined />}/>)}
    </div>
  );
}

// Wrapper para capturar params de tarjetas
function CardDetailWrapper() {
  const { cardId } = useParams();
  return <CardDetail cardId={cardId} />;
}

export default App;
