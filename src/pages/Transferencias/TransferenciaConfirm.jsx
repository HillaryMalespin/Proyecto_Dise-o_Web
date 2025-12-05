import React from "react";
import "../../styles/transferencias.css";
import { DoInterbankTransfer, DoInternalTransfer } from "../../services/transfer";
import MessageBox from "../MessageBox";

export default function TransferenciaConfirm({ data, onBack, onConfirm }) {
  const [loading, setLoading] = React.useState(false);

  const onVerify = async () => {
    try {
      setLoading(true);
      if(data.tipo === "terceros") {
        await DoInterbankTransfer(data.destino, data.origen, data.monto, data.moneda);
      }
      else {
        await DoInternalTransfer(data.destino, data.origen, data.monto, data.moneda);
      }
      setLoading(false);
      onConfirm();
    } catch (err) {
      setLoading(false);
      MessageBox("error", "Error: " + (err.message ?? "No se pudo completar la transferencia"));
    }
  }

  return (
    <div className="transfer-confirm" aria-label="Pantalla de confirmación de transferencia">
      <h2>Confirmar Transferencia</h2>

      <ul aria-label="Resumen de datos de la transferencia">
        <li aria-label={`Tipo de transferencia: ${data.tipo}`}><strong>Tipo:</strong> {data.tipo}</li>
        <li aria-label={`Cuenta origen: ${data.origen}`}><strong>Origen:</strong> {data.origen}</li>
        <li aria-label={`Cuenta destino: ${data.destino}`}><strong>Destino:</strong> {data.destino}</li>
        <li aria-label={`Moneda: ${data.moneda}`}><strong>Moneda:</strong> {data.moneda}</li>
        <li aria-label={`Monto: ${data.monto}`}><strong>Monto:</strong> {data.monto}</li>
        <li aria-label={`Descripción: ${data.descripcion || "No aplica"}`}><strong>Descripción:</strong> {data.descripcion || "N/A"}</li>
        <li aria-label={`Fecha: ${data.fecha}`}><strong>Fecha:</strong> {data.fecha}</li>
      </ul>

      <div className="actions" aria-label="Acciones de confirmación">
        <button
          className="btn-transfer"
          onClick={onBack}
          aria-label="Volver al formulario de transferencia"
        >
          Corregir
        </button>
        <button
          className="btn-transfer"
          onClick={onVerify}
          aria-label="Confirmar y continuar con la transferencia"
        >
          Confirmar
        </button>
      </div>
      <Loading visible={loading} />
    </div>
  );
}
