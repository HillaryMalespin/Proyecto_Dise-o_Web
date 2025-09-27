// Ejemplos de uso de la interfaz ApiInterface
// Este archivo muestra cómo usar la interfaz en diferentes componentes

import { apiRequest, post, get, handleApiResponse } from './ApiInterface.js';

// ============================================
// EJEMPLO 1: Componente de Login
// ============================================

export const ejemploLogin = async (email, password) => {
  console.log('--- EJEMPLO: Login ---');
  
  // Opción 1: Usando apiRequest directamente
  const result1 = await apiRequest('/login', { email, password });
  console.log('Resultado método 1:', result1);
  
  // Opción 2: Usando el wrapper POST
  const result2 = await post('/iniciarsecion', { email, password });
  console.log('Resultado método 2:', result2);
  
  // Opción 3: Con manejo de respuesta
  const result3 = await handleApiResponse(
    post('/signin', { email, password })
  );
  console.log('Resultado método 3:', result3);
  
  return result1;
};

// ============================================
// EJEMPLO 2: Componente de Registro
// ============================================

export const ejemploRegistro = async (userData) => {
  console.log('--- EJEMPLO: Registro ---');
  
  const { name, email, password, confirmPassword } = userData;
  
  const result = await post('/register', {
    name,
    email,
    password,
    confirmPassword
  });
  
  if (result.success) {
    console.log('✅ Usuario registrado:', result.data.user);
    // Aquí podrías redirigir o mostrar mensaje de éxito
  } else {
    console.error('❌ Error en registro:', result.message);
    // Aquí podrías mostrar el error en la UI
  }
  
  return result;
};

// ============================================
// EJEMPLO 3: Recuperación de Contraseña
// ============================================

export const ejemploRecuperarContrasena = async (email) => {
  console.log('--- EJEMPLO: Recuperar Contraseña ---');
  
  // Paso 1: Validar email
  const emailValidation = await post('/validar-email', { email });
  
  if (!emailValidation.success) {
    return {
      success: false,
      message: 'Email inválido'
    };
  }
  
  // Paso 2: Solicitar recuperación
  const result = await post('/recuperar-contrasena', { email });
  
  if (result.success) {
    console.log('📧 Email de recuperación enviado');
    // En una app real, mostrarías un mensaje al usuario
    // El token se imprime en consola para testing
  }
  
  return result;
};

// ============================================
// EJEMPLO 4: Resetear Contraseña (con token)
// ============================================

export const ejemploResetearContrasena = async (token, newPassword, confirmPassword) => {
  console.log('--- EJEMPLO: Resetear Contraseña ---');
  
  // Paso 1: Verificar token
  const tokenValidation = await post('/verificar-token-reset', { token });
  
  if (!tokenValidation.success) {
    return {
      success: false,
      message: 'Token inválido o expirado'
    };
  }
  
  // Paso 2: Cambiar contraseña
  const result = await post('/nueva-contrasena', {
    token,
    newPassword,
    confirmPassword
  });
  
  if (result.success) {
    console.log('🔒 Contraseña actualizada exitosamente');
  }
  
  return result;
};

// ============================================
// EJEMPLO 5: Obtener Perfil de Usuario
// ============================================

export const ejemploObtenerPerfil = async (token) => {
  console.log('--- EJEMPLO: Obtener Perfil ---');
  
  // Opción 1: Pasando token como data
  const result1 = await get('/perfil', { token });
  
  // Opción 2: Pasando token en options (más correcto para headers)
  const result2 = await get('/profile', {}, { token });
  
  if (result1.success) {
    console.log('👤 Perfil de usuario:', result1.data.user);
  }
  
  return result1;
};

// ============================================
// EJEMPLO 6: Uso en un componente React
// ============================================

export const EjemploComponenteReact = () => {
  // Este sería el código dentro de un componente React
  
  const handleLogin = async (formData) => {
    const { email, password } = formData;
    
    const result = await handleApiResponse(
      post('/login', { email, password })
    );
    
    if (result.success) {
      // Guardar token en localStorage
      localStorage.setItem('authToken', result.data.token);
      
      // Guardar datos del usuario
      localStorage.setItem('userData', JSON.stringify(result.data.user));
      
      // Redirigir a home
      // navigate('/home');
      
      return { success: true, message: 'Login exitoso' };
    } else {
      // Mostrar error en MessageBox
      return { success: false, message: result.message };
    }
  };
  
  const handleRegister = async (formData) => {
    const result = await post('/registro', formData);
    
    if (result.success) {
      return { 
        success: true, 
        message: 'Registro exitoso. Ya puedes iniciar sesión.' 
      };
    } else {
      return { 
        success: false, 
        message: result.message 
      };
    }
  };
  
  const handlePasswordReset = async (email) => {
    const result = await post('/recuperar-contrasena', { email });
    
    if (result.success) {
      return { 
        success: true, 
        message: 'Se ha enviado un enlace de recuperación a tu email' 
      };
    } else {
      return { 
        success: false, 
        message: result.message 
      };
    }
  };
  
  return {
    handleLogin,
    handleRegister,
    handlePasswordReset
  };
};

// ============================================
// EJEMPLO 7: Testing de todos los endpoints
// ============================================

export const testearTodosLosEndpoints = async () => {
  console.log('🧪 INICIANDO TESTS DE TODOS LOS ENDPOINTS...\n');
  
  // Test de login
  console.log('1. Testeando Login...');
  await ejemploLogin('usuario@ejemplo.com', '123456');
  
  // Test de registro
  console.log('\n2. Testeando Registro...');
  await ejemploRegistro({
    name: 'Nuevo Usuario',
    email: 'nuevo@test.com',
    password: '123456',
    confirmPassword: '123456'
  });
  
  // Test de recuperación
  console.log('\n3. Testeando Recuperación...');
  const resetResult = await ejemploRecuperarContrasena('usuario@ejemplo.com');
  
  // Si hay token, testear reset de contraseña
  if (resetResult.success) {
    console.log('\n4. Testeando Reset de Contraseña...');
    // En un escenario real, obtendrías el token del email o URL
    // Para el test, usaremos un token que sabemos existe
    await ejemploResetearContrasena('token-ejemplo', 'nuevaPass123', 'nuevaPass123');
  }
  
  console.log('\n✅ TESTS COMPLETADOS');
};

// Función para usar en desarrollo/debugging
export const debugEndpoints = () => {
  console.log('📋 ENDPOINTS DISPONIBLES:');
  console.log('Autenticación:', ['/login', '/register', '/logout']);
  console.log('Usuario:', ['/profile', '/validate-token']);
  console.log('Contraseña:', ['/forgot-password', '/verify-reset-token', '/reset-password']);
  console.log('\nPuedes usar cualquiera de estos endpoints con apiRequest() o los wrappers post(), get(), etc.');
};