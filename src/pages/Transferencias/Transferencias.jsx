import React, { useState } from "react";
import TransferenciaForm from "./TransferenciaForm";
import TransferenciaConfirm from "./TransferenciaConfirm";
import TransferenciaComprobante from "./TransferenciaComprobante";
import "../../styles/transferencias.css";


export default function Transferencias() {
  const [step, setStep] = useState(1); // 1=form, 2=confirm, 3=comprobante
  const [transferData, setTransferData] = useState(null);

  return (
    <div className="transferencias-container">
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
