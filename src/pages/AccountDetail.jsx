import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/accounts.json";
import "../styles/accountDetail.css";

const AccountDetail = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const account = data.accounts.find((acc) => acc.account_id === accountId);

  if (!account) {
    return <p>No se encontró la cuenta solicitada.</p>;
  }

  const movimientos = data.movimientos.filter(
    (mov) => mov.account_id === account.account_id
  );

  return (
    <div className="account-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <h2 className="detail-title">{account.alias}</h2>
      <p className="detail-info">{account.account_id}</p>
      <p className="detail-info">
        {account.tipo} • {account.moneda}
      </p>
      <p className="detail-balance">
        {account.saldo.toLocaleString("es-CR", {
          style: "currency",
          currency: account.moneda,
        })}
      </p>

      <h3 className="movimientos-title">Movimientos</h3>
      <div className="movimientos-list">
        {movimientos.length > 0 ? (
          movimientos.map((mov) => (
            <div key={mov.id} className="movimiento-card">
              <p className="mov-fecha">
                {new Date(mov.fecha).toLocaleDateString()}
              </p>
              <p className={`mov-tipo ${mov.tipo.toLowerCase()}`}>{mov.tipo}</p>
              <p className="mov-desc">{mov.descripcion}</p>
              <p className="mov-monto">
                {mov.saldo.toLocaleString("es-CR", {
                  style: "currency",
                  currency: mov.moneda,
                })}
              </p>
            </div>
          ))
        ) : (
          <p>No hay movimientos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default AccountDetail;
