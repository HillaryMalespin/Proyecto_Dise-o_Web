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
    <div className="transferencias-container">
      <button className="btn-back-transfer" onClick={() => navigate(-1)}>
        <img src={`${closeIcon}?v=${gifKey}`} alt="Cerrar"/>
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
        />
      )}
      {step === 3 && (
        <TransferenciaComprobante
          data={transferData}
          onBackToDashboard={() => setStep(1)}
        />
      )}
    </div>
  );
}
