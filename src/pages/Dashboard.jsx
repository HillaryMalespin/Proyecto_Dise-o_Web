import React, { useEffect } from "react";
import "../styles/dashboard.css";
import PinQuery from "./pinQuery/PinQuery";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const [isPinQueryVisible, setIsPinQueryVisible] = React.useState(false);

  const navigate = useNavigate();

  const goToAccounts = () => {
    navigate('/accounts');
  }

  const goToCards = () => {
    navigate('/cards');
  }

  const goToTransfer = () => {
    navigate('/transferencias');
  }

  return (
    <div>
      
      {/* Contenedor principal */}
      <div className="dashboard-container">
        <h1>Bienvenido al Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Cuentas</h3>
            <p>Consulta el saldo, movimientos y administra tus cuentas.</p>
            <button className="btn" onClick={goToAccounts}>Ver Cuentas</button>
          </div>

          <div className="dashboard-card">
            <h3>Tarjetas de crédito</h3>
            <p>Visualiza tus tarjetas de crédito.</p>
            <button className="btn" onClick={goToCards}>Ver Tarjetas</button>
          </div>

          <div className="dashboard-card">
            <h3>Transferencias</h3>
            <p>Realiza transferencias seguras entre tus cuentas o hacia terceros.</p>
            <button className="btn" onClick={goToTransfer}>Ir</button>
          </div>

          <div className="dashboard-card">
            <h3>Consulta de PIN</h3>
            <p>Accede a tus portafolios y explora nuevas oportunidades.</p>
            <button className="btn" onClick={() => setIsPinQueryVisible(true)}>Consultar</button>
          </div>

          <div className="dashboard-card">
            <h3>Configuración</h3>
            <p>Personaliza tu perfil y ajusta tus preferencias.</p>
            <button className="btn">Ir a configuración</button>
          </div>
        </div>
      </div>
      <PinQuery 
        visible={isPinQueryVisible} 
        onClose={() => setIsPinQueryVisible(false)} 
      />
    </div>
  );
};

export default Dashboard;
