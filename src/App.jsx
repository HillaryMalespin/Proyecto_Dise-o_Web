import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import RecoverPassword from "./pages/RecoverPassword.jsx";
import "./styles/home.css";

function App() {
  return (
    <div>
      {/* Navbar fijo */}
      <div className="navbar navbar-container" style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className="btn-link">Inicio</Link></li>
            <li><a href="#about">Quiénes somos</a></li>
            <li><a href="#help">Ayuda</a></li>
            <li><a href="#terms">Términos</a></li>
            <li><a href="#privacy">Privacidad</a></li>
            <li><Link to="/login" className="btn-link">Sign In</Link></li>
            <li><Link to="/register" className="btn-primary">Registrarse</Link></li>
          </ul>
        </nav>
      </div>

      {/* Aquí se muestran las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
    </div>
  );
}

export default App;
