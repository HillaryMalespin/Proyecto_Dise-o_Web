import React, { useEffect, useState } from "react";
import accountsData from "../../data/accounts.json";
import "../../styles/transferencias.css";
import { getAccounts } from "../../services/accounts";

export default function TransferenciaForm({ onContinue }) {
  const [tipo, setTipo] = useState("propias");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [moneda, setMoneda] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [cuentas, setCuentas] = useState([]);

  const handleSubmit = () => {
    onContinue({
      tipo,
      origen,
      destino,
      moneda,
      monto,
      descripcion,
      fecha: new Date().toLocaleString(),
    });
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsUser = await getAccounts("user");
      setCuentas(accountsUser.data);
    };
    fetchAccounts();
  }, []);

  return (
    <div className="transfer-form" aria-label="Formulario de transferencias">
      <h2>Transferencias</h2>

      <label>Tipo de transferencia</label>
      <select
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setDestino("");
        }}
        aria-label="Seleccionar tipo de transferencia"
      >
        <option value="internas">Entre el mismo banco</option>
        <option value="externas">A otros bancos</option>
      </select>

      <label>Cuenta origen</label>
      <select
        value={origen}
        onChange={(e) => {
          const sel = cuentas.find((c) => c.iban === e.target.value);
          setOrigen(e.target.value);
          setMoneda(sel.idtypemoney === 1 ? "CRC" : "USD");
        }}
        aria-label="Seleccionar cuenta de origen"
      >
        <option value="">Seleccione</option>
        {cuentas.map((c) => (
          <option key={c.iban} value={c.iban}>
            {c.iban} - {c.idtypemoney === 1 ? "CRC" : "USD"}
          </option>
        ))}
      </select>

      <label>Cuenta destino</label>
      {tipo === "" ? (
        <select
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          aria-label="Seleccionar cuenta de destino"
        >
          <option value="">Seleccione</option>
          {cuentasDestino.map((c) => (
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
          aria-label="Ingresar número de cuenta destino"
          inputMode="numeric"
        />
      )}

      <label>Moneda</label>
      <input
        type="text"
        value={moneda}
        readOnly
        aria-label="Moneda seleccionada"
        aria-readonly="true"
      />

      <label>Monto</label>
      <input
        type="number"
        step="0.01"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        aria-label="Monto a transferir"
        inputMode="decimal"
      />

      <label>Descripción (opcional)</label>
      <textarea
        maxLength={255}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        aria-label="Descripción de la transferencia"
      />

      <button
        type="button"
        className="btn-transfer"
        disabled={!origen || !destino || !monto}
        onClick={handleSubmit}
        aria-label="Continuar con la transferencia"
      >
        Continuar
      </button>
    </div>
  );
}
