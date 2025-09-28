// Hook personalizado para manejar el temporizador de reenvío de código
import { useState, useEffect } from 'react';

export const useResendTimer = (initialTime = 60) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    setCanResend(false);
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setCanResend(true);
  };

  return {
    timeLeft,
    canResend,
    startTimer,
    resetTimer
  };
};

// Hook para validación de contraseñas
export const usePasswordValidation = () => {
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [strength, setStrength] = useState('');

  // Evaluar fortaleza de contraseña
  const evaluateStrength = (password) => {
    if (password.length < 6) return 'weak';
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2) return 'weak';
    if (score < 4) return 'medium';
    return 'strong';
  };

  const validatePasswords = () => {
    const newErrors = {};
    
    if (passwords.new.length < 6) {
      newErrors.new = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (passwords.new !== passwords.confirm && passwords.confirm.length > 0) {
      newErrors.confirm = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePassword = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    
    if (field === 'new') {
      setStrength(evaluateStrength(value));
    }
    
    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return {
    passwords,
    errors,
    strength,
    updatePassword,
    validatePasswords,
    setErrors
  };
};