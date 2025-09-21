import { Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div>
      {/* Menú de navegación temporal */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      {/* Aquí se muestran las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
