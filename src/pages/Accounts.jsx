// Accounts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/accounts.css";
import { getAccounts } from "../services/accounts";

export default function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token) throw new Error("No hay token");
        if (!user?.id) throw new Error("ID de usuario no encontrado");

        const res = await getAccounts(user.id);

        const fixed = res.data.map((acc) => ({
          ...acc,
          funds: parseFloat(String(acc.funds).replace(/[$,]/g, "")) || 0
        }));

        setAccounts(fixed);

      } catch (err) {
        alert("Error cargando cuentas: " + err.message);
      }
    }

    load();
  }, []);

  const handleViewDetails = (iban) => {
    navigate(`/accounts/${iban}`);
  };

  return (
    <div className="accounts-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h2>Mis cuentas</h2>

      <div className="accounts-grid">
        {accounts.map((account) => (
          <div key={account.iban} className="account-card">
            <h3>{account.alias ?? "Cuenta"}</h3>
            <p>{account.iban}</p>

            <p>{account.idtypemoney === 1 ? "CRC" : "USD"}</p>

            <p className="account-balance">
              {account.funds.toLocaleString("es-CR", {
                style: "currency",
                currency: account.idtypemoney === 1 ? "CRC" : "USD"
              })}
            </p>

            <button className="btn" onClick={() => handleViewDetails(account.iban)}>
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
