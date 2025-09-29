import React from "react";
import "../../styles/transferencias.css";


export default function TransferenciaConfirm({ data, onBack, onConfirm }) {
  return (
    <div className="transfer-confirm">
      <h2>Confirmar Transferencia</h2>

      <ul>
        <li><strong>Tipo:</strong> {data.tipo}</li>
        <li><strong>Origen:</strong> {data.origen}</li>
        <li><strong>Destino:</strong> {data.destino}</li>
        <li><strong>Moneda:</strong> {data.moneda}</li>
        <li><strong>Monto:</strong> {data.monto}</li>
        <li><strong>Descripción:</strong> {data.descripcion || "N/A"}</li>
        <li><strong>Fecha:</strong> {data.fecha}</li>
      </ul>

      <div className="actions">
        <button className="btn-back-transfer" onClick={onBack}>Volver</button>
        <button className="btn-transfer" onClick={onConfirm}>Confirmar</button>
      </div>
    </div>
  );
}
