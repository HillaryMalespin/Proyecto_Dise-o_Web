import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data/accounts.json";
import "../styles/accountDetail.css";

const AccountDetail = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const account = data.accounts.find((acc) => acc.account_id === accountId);

  if (!account) {
    return <p role="alert">No se encontró la cuenta solicitada.</p>;
  }

  const movimientos = data.movimientos.filter(
    (mov) => mov.account_id === account.account_id
  );

  return (
    <div className="account-detail">
      {/* Botón de volver con etiqueta aria */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Volver a la página anterior"
      >
        ← Volver
      </button>

      {/* Encabezado principal (H1) */}
      <h1 className="detail-title">{account.alias}</h1>
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

      {/* Lista semántica de movimientos */}
      <h2 className="movimientos-title">Movimientos</h2>
      {movimientos.length > 0 ? (
        <ul className="movimientos-list">
          {movimientos.map((mov) => (
            <li
              key={mov.id}
              className="movimiento-card"
              aria-label={`Movimiento del ${new Date(
                mov.fecha
              ).toLocaleDateString()}, tipo ${mov.tipo}, monto ${
                mov.saldo
              } ${mov.moneda}`}
            >
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
            </li>
          ))}
        </ul>
      ) : (
        <p role="alert">No hay movimientos registrados.</p>
      )}
    </div>
  );
};

export default AccountDetail;
