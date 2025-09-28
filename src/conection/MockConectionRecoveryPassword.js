// Mock de conexión para recuperación de contraseña
// Simula las operaciones de recuperación de contraseña con datos ficticios

// Base de datos simulada de usuarios
const mockUsers = [
  {
    id: 1,
    email: "usuario@ejemplo.com",
    name: "Usuario Ejemplo",
    resetToken: 123456,
    resetTokenExpiry: 123456
  },
  {
    id: 2,
    email: "admin@test.com",
    name: "Administrador",
    resetToken: 123456,
    resetTokenExpiry: 123456
  },
  {
    id: 3,
    email: "test@gmail.com",
    name: "Usuario Test",
    resetToken: 123456,
    resetTokenExpiry: 123456
  }
];

// Simula delay de red
const networkDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Genera un token aleatorio para reset de contraseña
const generateResetToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Función para solicitar recuperación de contraseña
export const requestPasswordReset = async (email) => {
  await networkDelay(); // Simula delay de red

  try {
    // Buscar usuario por email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('No se encontró una cuenta asociada a este correo electrónico');
    }

    // Generar token de reset y establecer expiración
    const resetToken = "123456";
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    // Actualizar usuario con token
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;

    // Simular envío de email
    console.log(`📧 Email enviado a ${email}:`);
    console.log(`Token de recuperación: ${resetToken}`);
    console.log(`Expira en: ${resetTokenExpiry.toLocaleString()}`);

    return {
      success: true,
      message: 'Se ha enviado un enlace de recuperación a tu correo electrónico',
      data: {
        email: user.email,
        tokenSent: true
      }
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
};

// Función para verificar token de reset
export const verifyResetToken = async (token) => {
  await networkDelay(500);

  try {
    const user = mockUsers.find(u => u.resetToken === token);
    
    if (!user) {
      throw new Error('Token de recuperación inválido');
    }

    if (new Date() > new Date(user.resetTokenExpiry)) {
      throw new Error('El token de recuperación ha expirado');
    }

    return {
      success: true,
      message: 'Token válido',
      data: {
        email: user.email,
        userId: user.id
      }
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
};

// Función para resetear contraseña
export const resetPassword = async (token, newPassword, confirmPassword) => {
  await networkDelay();

  try {
    // Validaciones
    if (!newPassword || newPassword.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    // Verificar token
    const user = mockUsers.find(u => u.resetToken === token);
    
    if (!user) {
      throw new Error('Token de recuperación inválido');
    }

    if (new Date() > new Date(user.resetTokenExpiry)) {
      throw new Error('El token de recuperación ha expirado');
    }

    // Simular actualización de contraseña
    user.resetToken = null;
    user.resetTokenExpiry = null;
    // En una app real, aquí se encriptaría y guardaría la nueva contraseña

    console.log(`🔒 Contraseña actualizada para: ${user.email}`);

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente',
      data: {
        email: user.email,
        passwordUpdated: true
      }
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
};

// Función para validar formato de email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para obtener estado de todos los tokens (solo para debugging)
export const getTokensStatus = () => {
  return mockUsers.map(user => ({
    email: user.email,
    hasToken: !!user.resetToken,
    tokenExpiry: user.resetTokenExpiry,
    isExpired: user.resetTokenExpiry ? new Date() > new Date(user.resetTokenExpiry) : false
  }));
};

// Exportar usuarios mock para testing
export { mockUsers };