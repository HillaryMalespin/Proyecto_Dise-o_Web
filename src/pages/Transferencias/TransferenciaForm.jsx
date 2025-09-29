import React, { useState } from "react";
import accountsData from "../../data/accounts.json";
import "../../styles/transferencias.css";


export default function TransferenciaForm({ onContinue }) {
  const [tipo, setTipo] = useState("propias");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [moneda, setMoneda] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const cuentas = accountsData.accounts;

  const cuentasOrigen = cuentas;
  const cuentasDestino = tipo === "propias"
    ? cuentas.filter(acc => acc.account_id !== origen)
    : [];

  const handleSubmit = () => {
    onContinue({
      tipo,
      origen,
      destino,
      moneda,
      monto,
      descripcion,
      fecha: new Date().toLocaleString()
    });
  };

  return (
    <div className="transfer-form">
      <h2>Transferencias</h2>

      <label>Tipo de transferencia</label>
      <select value={tipo} onChange={(e) => {
        setTipo(e.target.value);
        setDestino("");
      }}>
        <option value="propias">Entre mis cuentas</option>
        <option value="terceros">A terceros (mismo banco)</option>
      </select>

      <label>Cuenta origen</label>
      <select value={origen} onChange={(e) => {
        const sel = cuentas.find(c => c.account_id === e.target.value);
        setOrigen(e.target.value);
        setMoneda(sel?.moneda || "");
      }}>
        <option value="">Seleccione</option>
        {cuentasOrigen.map(c => (
          <option key={c.account_id} value={c.account_id}>
            {c.alias} - {c.moneda}
          </option>
        ))}
      </select>

      <label>Cuenta destino</label>
      {tipo === "propias" ? (
        <select value={destino} onChange={(e) => setDestino(e.target.value)}>
          <option value="">Seleccione</option>
          {cuentasDestino.map(c => (
            <option key={c.account_id} value={c.account_id}>
              {c.alias} - {c.moneda}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder="Número de cuenta destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      )}

      <label>Moneda</label>
      <input type="text" value={moneda} readOnly />

      <label>Monto</label>
      <input
        type="number"
        step="0.01"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <label>Descripción (opcional)</label>
      <textarea
        maxLength={255}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button
        type="button"
        className="btn-transfer"
        disabled={!origen || !destino || !monto}
        onClick={handleSubmit}
      >
        Continuar
      </button>
    </div>
  );
}
