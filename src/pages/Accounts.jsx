import React from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/accounts.json";
import "../styles/accounts.css";

const Accounts = () => {
  const navigate = useNavigate();

  const handleViewDetails = (accountId) => {
    navigate(`/accounts/${accountId}`);
  };

  return (
    <div className="accounts-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <h2>Mis cuentas</h2>
      <div className="accounts-grid">
        {data.accounts.map((account) => (
          <div key={account.account_id} className="account-card">
            <h3>{account.alias}</h3>
            <p>{account.account_id}</p>
            <p>
              {account.tipo} • {account.moneda}
            </p>
            <p className="account-balance">
              {account.saldo.toLocaleString("es-CR", {
                style: "currency",
                currency: account.moneda,
              })}
            </p>
            <button
              className="btn"
              onClick={() => handleViewDetails(account.account_id)}
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
