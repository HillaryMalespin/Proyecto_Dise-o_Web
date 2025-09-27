import MessageBox from "./MessageBox";
import { post } from '../conection/ApiInterface';
import { useState } from "react";
import "../styles/login.css";

const RecoverPassword = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({
    message: '',
    type: 'info'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const result = await post('/recuperar-contrasena', { email });
    if (result.success) {
      setMessageData({
        message: 'Se ha enviado un código de recuperación a tu email',
        type: 'success'
      });
      setShowMessage(true);
    } else {
      setMessageData({
        message: `Error: ${result.message}`,
        type: 'error'
      });
      setShowMessage(true);
    }
  };

  return (
    <main className="login-wrapper">
      <MessageBox
        message={messageData.message}
        type={messageData.type}
        visible={showMessage}
        onClose={() => setShowMessage(false)}
      />
      <section className="card login-card">
        <h2 className="login-title">Recuperar Contraseña</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Correo */}
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="input"
            placeholder="Correo electrónico"
            required
          />

          {/* Botón */}
          <button type="submit" className="btn btn-primary">
            Recuperar contraseña
          </button>
        </form>

      </section>
    </main>
  );
};

export default RecoverPassword;
