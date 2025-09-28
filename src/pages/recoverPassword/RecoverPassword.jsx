import MessageBox from "../MessageBox";
import { post } from '../../conection/ApiInterface';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";
import "../../styles/recoverPassword.css";
import Loading from "../Loading";
import { EmailStep, CodeStep, PasswordStep, ConfirmationStep } from './RecoverPasswordSteps';
import { useResendTimer } from './useRecoverPassword';
import ProgressBar from "../../components/ProgressBar";

const RecoverPassword = () => {
  // Estados principales
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Código, 3: Nueva contraseña, 4: Confirmación
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageData, setMessageData] = useState({ message: '', type: 'info' });
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Token temporal para verificación
  const [resetToken, setResetToken] = useState('');
  
  const navigate = useNavigate();
  const { timeLeft, canResend, startTimer } = useResendTimer(60);

  // Paso 1: Solicitar código de verificación
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    
    if (!email) {
      showMessageBox('Por favor ingresa tu email', 'error');
      return;
    }

    setLoading(true);
    const result = await post('/recuperar-contrasena', { email });
    
    if (result.success) {
      setFormData(prev => ({ ...prev, email }));
      setCurrentStep(2);
      startTimer(); // Iniciar temporizador para reenvío
      showMessageBox('Se ha enviado un código de verificación a tu email', 'success');
    } else {
      showMessageBox(`Error: ${result.message}`, 'error');
    }
    
    setLoading(false);
  };

  // Paso 2: Verificar código
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    const code = e.target.code.value.trim();
    
    if (!code) {
      showMessageBox('Por favor ingresa el código de verificación', 'error');
      return;
    }

    setLoading(true);
    const result = await post('/verificar-token-reset', { token: code });
    
    if (result.success) {
      setFormData(prev => ({ ...prev, verificationCode: code }));
      setResetToken(code);
      setCurrentStep(3);
      showMessageBox('Código verificado correctamente', 'success');
    } else {
      showMessageBox(`Error: ${result.message}`, 'error');
    }
    
    setLoading(false);
  };

  // Paso 3: Nueva contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;
    
    // Validaciones
    if (!newPassword || !confirmPassword) {
      showMessageBox('Por favor completa todos los campos', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showMessageBox('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessageBox('Las contraseñas no coinciden', 'error');
      return;
    }

    setLoading(true);
    const result = await post('/nueva-contrasena', {
      token: resetToken,
      newPassword,
      confirmPassword
    });
    
    if (result.success) {
      setFormData(prev => ({ ...prev, newPassword, confirmPassword }));
      setCurrentStep(4);
      showMessageBox('Contraseña actualizada exitosamente', 'success');
    } else {
      showMessageBox(`Error: ${result.message}`, 'error');
    }
    
    setLoading(false);
  };

  // Reenviar código
  const handleResendCode = async () => {
    if (!canResend) return;
    
    setLoading(true);
    const result = await post('/recuperar-contrasena', { email: formData.email });
    
    if (result.success) {
      startTimer(); // Reiniciar temporizador
      showMessageBox('Código reenviado a tu email', 'success');
    } else {
      showMessageBox('Error al reenviar el código', 'error');
    }
    
    setLoading(false);
  };

  // Utilidad para mostrar mensajes
  const showMessageBox = (message, type) => {
    setMessageData({ message, type });
    setShowMessage(true);
  };

  // Ir al login
  const goToLogin = () => {
    navigate('/login');
  };

  // Volver al paso anterior
  const goBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const titles = [
    'Escribir Email',
    'Verificar Código',
    'Nueva Contraseña',
    '¡Listo!'
  ];

  return (
    <main className="login-wrapper">
      <Loading visible={loading} />
      <MessageBox
        message={messageData.message}
        type={messageData.type}
        visible={showMessage}
        onClose={() => setShowMessage(false)}
      />
      
      <section className="card login-card recover-password-card">
        <h2 className="login-title">Recuperación Contraseña</h2>
        
        {/* Indicador de progreso */}
        <ProgressBar currentStep={currentStep} steps={4} title={titles[currentStep - 1]} />

        {/* Renderizar paso actual */}
        {currentStep === 1 && (
          <EmailStep 
            onSubmit={handleEmailSubmit}
            loading={loading}
            initialEmail={formData.email}
          />
        )}

        {currentStep === 2 && (
          <div>
            <CodeStep 
              onSubmit={handleCodeSubmit}
              onResend={handleResendCode}
              onBack={goBackStep}
              loading={loading}
              email={formData.email}
            />
            {!canResend && timeLeft > 0 && (
              <p className="resend-timer">
                Puedes reenviar el código en {timeLeft} segundos
              </p>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <PasswordStep 
            onSubmit={handlePasswordSubmit}
            onBack={goBackStep}
            loading={loading}
          />
        )}

        {currentStep === 4 && (
          <ConfirmationStep onGoToLogin={goToLogin} />
        )}
      </section>
    </main>
  );
};

export default RecoverPassword;
