// Componentes auxiliares para el flujo de recuperación de contraseña

import { useState } from 'react';

// Paso 1: Solicitar email
export const EmailStep = ({ onSubmit, loading, initialEmail = '' }) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <p className="step-description">
        Ingresa tu correo electrónico para recibir un código de verificación.
      </p>
      
      <input
        type="email"
        id="email"
        className="input"
        placeholder="Correo electrónico"
        defaultValue={initialEmail}
        required
      />

      <button type="submit" className="btn btn-primary" disabled={loading}>
        Enviar código
      </button>
      
      <p className="login-extra">
        ¿Recordaste tu contraseña? <a href="/login">Inicia sesión</a>
      </p>
    </form>
  );
};

// Paso 2: Verificar código
export const CodeStep = ({ onSubmit, onResend, onBack, loading, email }) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <p className="step-description">
        Hemos enviado un código de verificación a <strong>{email}</strong>
      </p>
      
      <input
        type="text"
        id="code"
        className="input"
        placeholder="Ingresa el código de 6 dígitos"
        maxLength="6"
        required
      />

      <button type="submit" className="btn btn-primary" disabled={loading}>
        Verificar código
      </button>
      
      <div className="form-actions">
        <button type="button" className="btn btn-link" onClick={onResend} disabled={loading}>
          Reenviar código
        </button>
        <button type="button" className="btn btn-link" onClick={onBack}>
          Volver
        </button>
      </div>
    </form>
  );
};

// Paso 3: Nueva contraseña
export const PasswordStep = ({ onSubmit, onBack, loading }) => {
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const validatePasswords = () => {
    const newErrors = {};
    
    if (passwords.new.length < 6) {
      newErrors.new = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      onSubmit(e);
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <p className="step-description">
        Crea una nueva contraseña segura para tu cuenta.
      </p>
      
      <div className="input-group">
        <input
          type="password"
          id="newPassword"
          className={`input ${errors.new ? 'error' : ''}`}
          placeholder="Nueva contraseña (mínimo 6 caracteres)"
          value={passwords.new}
          onChange={(e) => handlePasswordChange('new', e.target.value)}
          minLength="6"
          required
        />
        {errors.new && <span className="error-message">{errors.new}</span>}
      </div>

      <div className="input-group">
        <input
          type="password"
          id="confirmPassword"
          className={`input ${errors.confirm ? 'error' : ''}`}
          placeholder="Confirma tu nueva contraseña"
          value={passwords.confirm}
          onChange={(e) => handlePasswordChange('confirm', e.target.value)}
          minLength="6"
          required
        />
        {errors.confirm && <span className="error-message">{errors.confirm}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        Cambiar contraseña
      </button>
      
      <div className="form-actions">
        <button type="button" className="btn btn-link" onClick={onBack}>
          Volver
        </button>
      </div>
    </form>
  );
};

// Paso 4: Confirmación
export const ConfirmationStep = ({ onGoToLogin }) => {
  return (
    <div className="confirmation-step">
      <div className="success-icon">✓</div>
      <h3>¡Contraseña actualizada!</h3>
      <p>Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.</p>
      
      <button className="btn btn-primary" onClick={onGoToLogin}>
        Ir a iniciar sesión
      </button>
    </div>
  );
};