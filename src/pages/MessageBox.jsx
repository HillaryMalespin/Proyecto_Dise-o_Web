import errorAnimation from "../assets/messagebox/error_animation.webp";
import successAnimation from '../assets/messagebox/success_animation.webp';
import infoAnimation from '../assets/messagebox/info_animation.webp';
import defaultAnimation from '../assets/messagebox/default_animation.webp';
import { useEffect, useState } from 'react';
import '../styles/messageBox.css';


const MessageBox = ({ message, type, visible, onClose, onClick = () => {} }) => {

  const [visibleState, setVisibleState] = useState(visible);
  const [isClosing, setIsClosing] = useState(true);

  const getAnimationImage = (type) => {
    switch (type) {
      case 'success':
        return successAnimation;
      case 'error':
        return errorAnimation;
      case 'info':
        return infoAnimation;
      default:
        return defaultAnimation;
    }
  };

  // Sincronizar con el prop visible del padre
  useEffect(() => {
    if (visible) {
      setVisibleState(true);
      setIsClosing(false);
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      setIsClosing(true);
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';
      // Esperar a que termine la animación antes de ocultar
      setTimeout(() => setVisibleState(false), 200);
    }
  }, [visible]);

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      // Restaurar scroll del body al desmontar
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Función para cerrar y notificar al padre
  const handleClose = () => {
    setIsClosing(true);
    // Esperar a que termine la animación antes de notificar al padre
    setTimeout(() => {
      setVisibleState(false);
      if (onClose) {
        onClose(); // Notifica al componente padre
      }
      onClick(); // Ejecuta la función onClick si se proporciona
    }, 200);
  };

  // Cerrar al hacer clic en el fondo (overlay)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`message-box-container ${isClosing ? 'closing' : ''}`}
      style={{ display: visibleState ? 'flex' : 'none' }}
      onClick={handleOverlayClick}
    >
      <div className={`message-box ${type}`}>
        <label>{message}</label>
        <img src={getAnimationImage(type)} alt={`${type} animation`} />
        <div>
          <button onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;