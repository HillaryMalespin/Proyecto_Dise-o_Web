import { useEffect, useState } from "react";
import '../../styles/pinQuery.css';
import MessageBox from "../MessageBox";
import closeIcon from '../../assets/pinconsult/pin_consult_close.gif';
import Loading from "../Loading";
import copyAnimation from '../../assets/pinconsult/copy_animation.gif';
import { requestCardOTP, verifyCardOTP } from "../../services/pin";

export default function PinQuery({ visible, onClose, cardId }) {
  const [step, setStep] = useState(1);
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isVisible, setIsVisible] = useState(visible);
  const [gifKey, setGifKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(null);
  const [data, setData] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage("PIN copiado al portapapeles");
      setMessageType("success");
      setMessageBoxVisible(true);
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = "unset";
    if (onClose) {
      clearTimeout(timeOut);
      onClose();
    }
  };

  // Mostrar información del PIN
  const showCardInfo = (info) => {
    setData(info);
    setStep(2);

    const timeoutId = setTimeout(() => {
      handleClose();
    }, 12000);

    setTimeOut(timeoutId);
  };

  // Validar OTP
  const validateVerificationCode = async (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim();

    if (!code || code.length !== 6) {
      setMessage("Por favor ingresa un código válido de 6 dígitos.");
      setMessageType("error");
      setMessageBoxVisible(true);
      return;
    }

    setLoading(true);

    const result = await verifyCardOTP(cardId, code);

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message ?? "OTP inválido");
      setMessageType("error");
      setMessageBoxVisible(true);
      return;
    }

    showCardInfo(result.card);
  };

  // Solicitar OTP al abrir modal
  useEffect(() => {
    async function init() {
      if (visible) {
        setIsVisible(true);
        setStep(1);
        setGifKey(Date.now());
        document.body.style.overflow = "hidden";

        await requestCardOTP(cardId);

        setMessage("Se ha enviado un código de verificación a tu email.");
        setMessageType("info");
        setMessageBoxVisible(true);
      } else {
        setIsVisible(false);
        document.body.style.overflow = "unset";
      }
    }

    init();
  }, [visible]);

  return (
    <main
      className="card-pin-query-container"
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <h1>Consulta de PIN</h1>

      {step === 1 && (
        <section className="card-pin-query">
          <button className="btn-close">
            <img src={`${closeIcon}?v=${gifKey}`} alt="Cerrar" onClick={handleClose} />
          </button>

          <h2>Verificación de PIN</h2>
          <p>Por favor, ingresa el código que has recibido en tu correo.</p>

          <form className="form-query-pin" onSubmit={validateVerificationCode}>
            <input
              id="code"
              type="number"
              placeholder="Código de verificación"
              max={999999}
              min={100000}
              required
            />
            <button type="submit">Verificar</button>
          </form>
        </section>
      )}

      {/* Paso 2: Mostrar PIN y CVV */}
      {step === 2 && (
        <section className="card-pin-query">
          <button className="btn-close">
            <img src={`${closeIcon}?v=${gifKey}`} alt="Cerrar" onClick={handleClose} />
          </button>

          <div className="card-consult-pin">
            <header className="card-pin-info-header">
              <section className="card-info-pin">
                <div>
                  <h3>PIN</h3>
                  <p>{data.pin}</p>
                </div>
                <button title="Copiar PIN" onClick={() => copyToClipboard(data.pin)}>
                  <img src={copyAnimation} alt="Copiar PIN" />
                </button>
              </section>

              <section className="card-info-cvv">
                <h3>CVV</h3>
                <p>{data.cvv}</p>
              </section>
            </header>

            <main className="card-number-info">
              <p>XXXX-XXXX-XXXX-{data.cardNumber}</p>
            </main>

            <footer className="card-pin-info-footer">
              <p>{data.type}</p>
            </footer>
          </div>
        </section>
      )}

      <MessageBox
        visible={messageBoxVisible}
        message={message}
        type={messageType}
        onClose={() => setMessageBoxVisible(false)}
      />

      <Loading visible={loading} />
    </main>
  );
}
