import React from "react";
import "../../styles/transferencias.css";


export default function TransferenciaComprobante({ data, onBackToDashboard }) {
  const handleDownload = () => {
    const contenido = `
      Comprobante de Transferencia
      ----------------------------
      Tipo: ${data.tipo}
      Origen: ${data.origen}
      Destino: ${data.destino}
      Moneda: ${data.moneda}
      Monto: ${data.monto}
      Descripción: ${data.descripcion || "N/A"}
      Fecha: ${data.fecha}
    `;
    const blob = new Blob([contenido], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "comprobante.txt";
    link.click();
  };

  return (
    <div className="transfer-receipt">
      <h2>Transferencia Exitosa ✅</h2>

      <p>Se ha realizado la transferencia correctamente.</p>
      <button className="btn-transfer" onClick={handleDownload}>
        Descargar Comprobante
      </button>
      <button className="btn-transfer" onClick={onBackToDashboard}>
        Volver a otra transferencia
      </button>
    </div>
  );
}
