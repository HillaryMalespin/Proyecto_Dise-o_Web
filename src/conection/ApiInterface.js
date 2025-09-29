// Interfaz centralizada para conexiones mock
// Actúa como un router que recibe URLs y datos, y ejecuta el método mock correspondiente

import { 
  login, 
  register, 
  getUserProfile, 
  validateToken, 
  logout,
  pinCvvConsult
} from './MockConection.js';

import { 
  requestPasswordReset, 
  verifyResetToken, 
  resetPassword, 
  validateEmail 
} from './MockConectionRecoveryPassword.js';

/**
 * Interfaz principal para realizar peticiones a los mocks
 * @param {string} url - URL del endpoint (ej: '/login', '/register')
 * @param {Object} data - Datos a enviar (opcional)
 * @param {Object} options - Opciones adicionales como headers, token, etc. (opcional)
 * @returns {Promise<Object>} - Respuesta del mock
 */
export const apiRequest = async (url, data = {}, options = {}) => {
  try {
    console.log(`🌐 API Request: ${url}`, { data, options });

    // Normalizar URL (remover slash inicial si existe)
    const normalizedUrl = url.startsWith('/') ? url.slice(1) : url;

    // Router de URLs a métodos mock
    switch (normalizedUrl.toLowerCase()) {
      // === AUTENTICACIÓN ===
      case 'login':
      case 'iniciarsecion':
      case 'signin':
        return await login(data.email, data.password);

      case 'register':
      case 'registro':
      case 'signup':
        return await register(data);

      case 'logout':
      case 'cerrarsesion':
      case 'signout':
        return await logout();

      // === PERFIL DE USUARIO ===
      case 'profile':
      case 'perfil':
      case 'user':
        return await getUserProfile(options.token || data.token);

      case 'validate-token':
      case 'validar-token':
      case 'verify-token':
        return await validateToken(options.token || data.token);

      // === RECUPERACIÓN DE CONTRASEÑA ===
      case 'forgot-password':
      case 'recuperar-contrasena':
      case 'reset-password-request':
      case 'solicitar-recuperacion':
        return await requestPasswordReset(data.email);

      case 'verify-reset-token':
      case 'verificar-token-reset':
      case 'validate-reset-token':
        return await verifyResetToken(data.token);

      case 'reset-password':
      case 'cambiar-contrasena':
      case 'nueva-contrasena':
        return await resetPassword(data.token, data.newPassword, data.confirmPassword);

      case 'pin-cvv-consult':
      case 'consultar-pin-cvv':
        return await pinCvvConsult(data.token);

      case 'validate-email':
      case 'validar-email':
        return {
          success: validateEmail(data.email),
          message: validateEmail(data.email) ? 'Email válido' : 'Email inválido',
          data: { isValid: validateEmail(data.email) }
        };

      // === CASO DEFAULT ===
      default:
        throw new Error(`Endpoint no encontrado: ${url}`);
    }

  } catch (error) {
    console.error(`❌ Error en API Request (${url}):`, error.message);
    
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
};

/**
 * Wrapper para peticiones GET (principalmente para obtener datos)
 * @param {string} url - URL del endpoint
 * @param {Object} options - Opciones como token, headers, etc.
 * @returns {Promise<Object>} - Respuesta del mock
 */
export const get = async (url, options = {}) => {
  return await apiRequest(url, {}, options);
};

/**
 * Wrapper para peticiones POST (para enviar datos)
 * @param {string} url - URL del endpoint
 * @param {Object} data - Datos a enviar
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} - Respuesta del mock
 */
export const post = async (url, data = {}, options = {}) => {
  return await apiRequest(url, data, options);
};

/**
 * Wrapper para peticiones PUT (para actualizar datos)
 * @param {string} url - URL del endpoint
 * @param {Object} data - Datos a actualizar
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} - Respuesta del mock
 */
export const put = async (url, data = {}, options = {}) => {
  return await apiRequest(url, data, options);
};

/**
 * Wrapper para peticiones DELETE
 * @param {string} url - URL del endpoint
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<Object>} - Respuesta del mock
 */
export const del = async (url, options = {}) => {
  return await apiRequest(url, {}, options);
};

/**
 * Configuración global para requests
 */
export const apiConfig = {
  baseURL: '/api', // URL base simulada
  timeout: 5000,   // Timeout simulado
  
  // Headers por defecto
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  // Interceptor para agregar token automáticamente
  setAuthToken: (token) => {
    apiConfig.defaultHeaders.Authorization = `Bearer ${token}`;
  },

  // Remover token
  removeAuthToken: () => {
    delete apiConfig.defaultHeaders.Authorization;
  }
};

/**
 * Utlidad para manejar respuestas de manera consistente
 * @param {Promise} apiCall - Llamada a la API
 * @returns {Promise<Object>} - Respuesta procesada
 */
export const handleApiResponse = async (apiCall) => {
  try {
    const response = await apiCall;
    
    if (response.success) {
      console.log('✅ API Success:', response.message);
    } else {
      console.warn('⚠️ API Warning:', response.message);
    }
    
    return response;
  } catch (error) {
    console.error('❌ API Error:', error);
    
    return {
      success: false,
      message: 'Error de conexión',
      data: null
    };
  }
};

/**
 * Lista de todos los endpoints disponibles (para documentación)
 */
export const availableEndpoints = {
  // Autenticación
  auth: {
    login: ['/login', '/iniciarsecion', '/signin'],
    register: ['/register', '/registro', '/signup'],
    logout: ['/logout', '/cerrarsesion', '/signout']
  },
  
  // Usuario
  user: {
    profile: ['/profile', '/perfil', '/user'],
    validateToken: ['/validate-token', '/validar-token', '/verify-token']
  },
  
  // Recuperación de contraseña
  password: {
    requestReset: ['/forgot-password', '/recuperar-contrasena', '/solicitar-recuperacion'],
    verifyToken: ['/verify-reset-token', '/verificar-token-reset'],
    resetPassword: ['/reset-password', '/cambiar-contrasena', '/nueva-contrasena'],
    validateEmail: ['/validate-email', '/validar-email']
  }
};

// Exportar todo como default también
export default {
  apiRequest,
  get,
  post,
  put,
  del,
  apiConfig,
  handleApiResponse,
  availableEndpoints
};