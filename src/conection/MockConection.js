// Mock de conexión general
// Simula operaciones básicas de autenticación y usuario

// Base de datos simulada de usuarios
const mockUsers = [
  {
    id: 1,
    email: "usuario@ejemplo.com",
    password: "123456",
    name: "Usuario Ejemplo",
    role: "user",
    isActive: true,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    email: "admin@test.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    email: "test@gmail.com",
    password: "test123",
    name: "Usuario Test",
    role: "user",
    isActive: true,
    createdAt: "2024-02-01"
  }
];

// Simula delay de red
const networkDelay = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Función de login
export const login = async (email, password) => {
  await networkDelay();

  try {
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }

    const user = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new Error('Cuenta desactivada');
    }

    // Simular generación de token
    const token = btoa(`${user.id}-${Date.now()}`);

    console.log(`✅ Login exitoso para: ${user.email}`);

    return {
      success: true,
      message: 'Login exitoso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token: token
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

export const pinCvvConsult = async (token) => {
  await networkDelay(500);
  try {
    if (!token) {
      throw new Error('Token requerido');
    }
    if (token !== '123456') {
      throw new Error('Token inválido');
    }
    return {
      success: true,
      message: 'Token válido',
      data: {
        isValid: true,
        cvv: '123',
        pin: '1234',
        cardNumber: '1111',
        type: 'Debito',
      }
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: {
        isValid: false
      }
    };
  }
};

// Función de registro
export const register = async (userData) => {
  await networkDelay();

  try {
    const { email, password, name, confirmPassword } = userData;

    // Validaciones
    if (!email || !password || !name) {
      throw new Error('Todos los campos son requeridos');
    }

    if (password !== confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Verificar si el email ya existe
    const existingUser = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      throw new Error('Este email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = {
      id: mockUsers.length + 1,
      email: email.toLowerCase(),
      password: password,
      name: name,
      role: "user",
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    mockUsers.push(newUser);

    console.log(`👤 Usuario registrado: ${newUser.email}`);

    return {
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        }
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

// Función para obtener perfil de usuario
export const getUserProfile = async (token) => {
  await networkDelay(500);

  try {
    if (!token) {
      throw new Error('Token requerido');
    }

    // Decodificar token (simulado)
    const decoded = atob(token).split('-');
    const userId = parseInt(decoded[0]);

    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return {
      success: true,
      message: 'Perfil obtenido',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt
        }
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

// Función para validar token
export const validateToken = async (token) => {
  await networkDelay(300);

  try {
    if (!token) {
      throw new Error('Token requerido');
    }

    // Decodificar token (simulado)
    const decoded = atob(token).split('-');
    const userId = parseInt(decoded[0]);
    const timestamp = parseInt(decoded[1]);

    // Verificar si el token no ha expirado (24 horas)
    const isExpired = (Date.now() - timestamp) > (24 * 60 * 60 * 1000);
    
    if (isExpired) {
      throw new Error('Token expirado');
    }

    const user = mockUsers.find(u => u.id === userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return {
      success: true,
      message: 'Token válido',
      data: {
        valid: true,
        userId: user.id
      }
    };

  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: {
        valid: false
      }
    };
  }
};

// Función de logout (principalmente para limpiar tokens del lado cliente)
export const logout = async () => {
  await networkDelay(300);
  
  console.log('🚪 Sesión cerrada');
  
  return {
    success: true,
    message: 'Sesión cerrada exitosamente',
    data: null
  };
};

// Exportar usuarios mock para testing
export { mockUsers };