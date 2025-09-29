import { useEffect } from "react";
import { useState } from "react";
import '../../styles/pinQuery.css';
import MessageBox from "../MessageBox";
import closeIcon from '../../assets/pinconsult/pin_consult_close.gif';
import Loading from "../Loading";
import copyAnimation from '../../assets/pinconsult/copy_animation.gif';
import { post } from '../../conection/ApiInterface';

const PinQuery = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [messageBoxVisible, setMessageBoxVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [isVisible, setIsVisible] = useState(visible);
  const [gifKey, setGifKey] = useState(0); // Para forzar recarga del GIF
  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(null);
  const [data, setData] = useState();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage("PIN copiado al portapapeles");
      setMessageType("success");
      setMessageBoxVisible(true);
    });
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = 'unset'; // Restaura scroll
    if (onClose) {
      clearTimeout(timeOut);
      onClose(); // Notifica al componente padre
    }
  };

  const showCardInfo = (data) => {
    setStep(2);
    setData(data);
    const timeoutId = setTimeout(() => {
      handleClose();
    }, 12000);
    setTimeOut(timeoutId);
  };

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
    const result = await post('/pin-cvv-consult', { token: code });
    setLoading(false);
    if (!result.success) {
      setMessage(`Error: ${result.message}`);
      setMessageType('error');
      setMessageBoxVisible(true);
    } else {
      showCardInfo(result.data);
    }
  }

  useEffect(() => {
    setStep(1);
    if (visible) {
      setIsVisible(visible);
      setMessage("Se ha enviado un código de verificación a tu email.");
      setMessageType("");
      setMessageBoxVisible(true);
      setGifKey(Date.now()); // Nuevo timestamp para forzar recarga del GIF
      document.body.style.overflow = 'hidden'; // Bloquea scroll
    } else {
      setIsVisible(visible);
      document.body.style.overflow = 'unset'; // Restaura scroll
    }
  }, [visible]);

  return (
    <main className="card-pin-query-container" style={{ display: isVisible ? 'flex' : 'none' }}>
      <h1>Consulta de PIN</h1>
      {step === 1 && <section className="card-pin-query">
        <button className="btn-close">
          <img src={`${closeIcon}?v=${gifKey}`} alt="Cerrar" onClick={handleClose} />
        </button>
        <h2>Verificación de PIN</h2>
        <p>Por favor, ingresa el código de verificación que has recibido.</p>
        <form className="form-query-pin" onSubmit={validateVerificationCode}>
          <input id="code" type="number" placeholder="Código de verificación" max={999999} min={100000} required typeof="password"/>
          <button type="submit">Verificar</button>
        </form>
      </section>}
      {step === 2 && <section className="card-pin-query">
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
      </section>}
      <MessageBox visible={messageBoxVisible} message={message} type={messageType} onClose={() => setMessageBoxVisible(false)} />
      <Loading visible={loading} />
    </main>
  );
};
export default PinQuery;