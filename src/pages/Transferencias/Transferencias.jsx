import React, { useEffect, useState } from "react";
import TransferenciaForm from "./TransferenciaForm";
import TransferenciaConfirm from "./TransferenciaConfirm";
import TransferenciaComprobante from "./TransferenciaComprobante";
import "../../styles/transferencias.css";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/pinconsult/pin_consult_close.gif";

export default function Transferencias() {
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=comprobante
  const [transferData, setTransferData] = useState(null);
  const navigate = useNavigate();
  const [gifKey, setGifKey] = useState(0); // Para forzar recarga del GIF

  useEffect(() => {
    setGifKey(Date.now());
  }, []);

  return (
    <div
      className="transferencias-container"
      aria-label={
        step === 1
          ? "Módulo de transferencias, paso 1: formulario"
          : step === 2
          ? "Módulo de transferencias, paso 2: confirmación"
          : "Módulo de transferencias, paso 3: comprobante"
      }
    >
      <button
        className="btn-back-transfer"
        onClick={() => navigate(-1)}
        aria-label="Volver a la página anterior"
      >
        <img src={`${closeIcon}?v=${gifKey}`} alt="Volver"/>
      </button>

      {step === 1 && (
        <TransferenciaForm
          onContinue={(data) => {
            setTransferData(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <TransferenciaConfirm
          data={transferData}
          onBack={() => setStep(1)}
          onConfirm={() => setStep(3)}
          aria-label="Pantalla de confirmación de transferencia"
        />
      )}

      {step === 3 && (
        <TransferenciaComprobante
          data={transferData}
          onBackToDashboard={() => setStep(1)}
          aria-label="Comprobante de transferencia"
        />
      )}
    </div>
  );
}
