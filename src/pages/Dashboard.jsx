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
    <div aria-label="Panel principal del dashboard">
      
      {/* Contenedor principal */}
      <div className="dashboard-container" aria-label="Sección de accesos rápidos">
        <h1>Bienvenido al Dashboard</h1>

        <div className="dashboard-grid" aria-label="Módulos del dashboard">
          <div className="dashboard-card" aria-label="Módulo Cuentas">
            <h3>Cuentas</h3>
            <p>Consulta el saldo, movimientos y administra tus cuentas.</p>
            <button
              className="btn"
              onClick={goToAccounts}
              aria-label="Ir a la sección de Cuentas"
            >
              Ver Cuentas
            </button>
          </div>

          <div className="dashboard-card" aria-label="Módulo Tarjetas de crédito">
            <h3>Tarjetas de crédito</h3>
            <p>Visualiza tus tarjetas de crédito.</p>
            <button
              className="btn"
              onClick={goToCards}
              aria-label="Ir a la sección de Tarjetas de crédito"
            >
              Ver Tarjetas
            </button>
          </div>

          <div className="dashboard-card" aria-label="Módulo Transferencias">
            <h3>Transferencias</h3>
            <p>Realiza transferencias seguras entre tus cuentas o hacia terceros.</p>
            <button
              className="btn"
              onClick={goToTransfer}
              aria-label="Ir a la sección de Transferencias"
            >
              Ir
            </button>
          </div>

          <div className="dashboard-card" aria-label="Módulo Consulta de PIN">
            <h3>Consulta de PIN</h3>
            <p>Accede a tus portafolios y explora nuevas oportunidades.</p>
            <button
              className="btn"
              onClick={() => setIsPinQueryVisible(true)}
              aria-label="Abrir consulta de PIN"
              aria-haspopup="dialog"
              aria-controls="pinquery-dialog"
            >
              Consultar
            </button>
          </div>

          <div className="dashboard-card" aria-label="Módulo Configuración">
            <h3>Configuración</h3>
            <p>Personaliza tu perfil y ajusta tus preferencias.</p>
            <button
              className="btn"
              aria-label="Ir a configuración"
            >
              Ir a configuración
            </button>
          </div>
        </div>
      </div>

      {/* El componente debe exponer id="pinquery-dialog" en su contenedor raíz si es un modal */}
      <PinQuery
        visible={isPinQueryVisible}
        onClose={() => setIsPinQueryVisible(false)}
      />
    </div>
  );
};

export default Dashboard;
