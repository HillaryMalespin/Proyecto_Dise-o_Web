import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountDetail, getMovements } from "../services/accounts";



export default function AccountDetail() {
  const { accountId } = useParams();   // 

  const [account, setAccount] = useState(null);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        if (!accountId) throw new Error("No se recibió ID de cuenta");

        //  Obtener detalles
        const acc = await getAccountDetail(accountId);
        const data = acc.data;

        if (!data) throw new Error("La cuenta no existe");

        // Normalizar fondos
        let funds = data.funds;
        if (typeof funds === "string") {
          funds = parseFloat(funds.replace(/[$,]/g, "")) || 0;
        }
        data.funds = funds;

        setAccount(data);

        // Obtener movimientos usando el ID REAL
        const movs = await getMovements(accountId);

        const fixed = Array.isArray(movs.data)
          ? movs.data.map((m, i) => ({
              ...m,
              key: m.idmovement ?? i,
              date: m.date
                ? new Date(m.date).toLocaleDateString("es-CR")
                : "Sin fecha"
            }))
          : [];

        setMovements(fixed);

      } catch (err) {
        alert("Error cargando detalles: " + err.message);
      }
    }

    load();
  }, [accountId]);

  if (!account) return <p>Cargando...</p>;

  return (
    <div className="account-detail">
      <h2>Detalles de la cuenta</h2>

      <p><strong>Alias:</strong> {account.alias ?? "Sin alias"}</p>
      <p><strong>IBAN:</strong> {account.iban}</p>
      <p><strong>Moneda:</strong> {account.idtypemoney === 1 ? "CRC" : "USD"}</p>

      <p>
        <strong>Saldo:</strong>{" "}
        {account.funds.toLocaleString("es-CR", {
          style: "currency",
          currency: account.idtypemoney === 1 ? "CRC" : "USD"
        })}
      </p>

      <h3>Movimientos</h3>

      {movements.length === 0 && <p>No hay movimientos</p>}

      {movements.map((m) => (
        <div key={m.key} className="movement-card">
          <p><strong>Fecha:</strong> {m.date}</p>
          <p><strong>Monto:</strong> {m.amount}</p>
          <p><strong>Descripción:</strong> {m.description}</p>
        </div>
      ))}
    </div>
  );
}
