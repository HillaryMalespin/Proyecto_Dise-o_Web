# Documentación de Mocks de Conexión

Este directorio contiene los mocks (simuladores) para las operaciones de backend de la aplicación.

## Archivos disponibles

### 🌟 ApiInterface.js (INTERFAZ PRINCIPAL)
**Interfaz centralizada que actúa como router para todos los mocks**
- `apiRequest(url, data, options)` - Función principal que enruta URLs a métodos mock
- `post(url, data, options)` - Wrapper para peticiones POST
- `get(url, options)` - Wrapper para peticiones GET
- `put(url, data, options)` - Wrapper para peticiones PUT
- `del(url, options)` - Wrapper para peticiones DELETE
- `handleApiResponse(apiCall)` - Utilidad para manejar respuestas consistentemente

### MockConection.js
Contiene funciones para operaciones generales de autenticación:
- `login(email, password)` - Iniciar sesión
- `register(userData)` - Registrar nuevo usuario
- `getUserProfile(token)` - Obtener perfil de usuario
- `validateToken(token)` - Validar token de sesión
- `logout()` - Cerrar sesión

### MockConectionRecoveryPassword.js
Contiene funciones específicas para recuperación de contraseña:
- `requestPasswordReset(email)` - Solicitar recuperación de contraseña
- `verifyResetToken(token)` - Verificar token de recuperación
- `resetPassword(token, newPassword, confirmPassword)` - Resetear contraseña
- `validateEmail(email)` - Validar formato de email

### ExamplesApiInterface.js
Ejemplos completos de cómo usar la interfaz en componentes React

## 🚀 Uso Recomendado (con ApiInterface)

### Importar la interfaz:
```jsx
import { post, get, handleApiResponse } from '../conection/ApiInterface';
```

### En un componente de Login:
```jsx
const LoginComponent = () => {
  const handleLogin = async (email, password) => {
    const result = await post('/login', { email, password });
    
    if (result.success) {
      // Guardar token y redireccionar
      localStorage.setItem('token', result.data.token);
      console.log('Usuario logueado:', result.data.user);
    } else {
      // Mostrar error
      console.error('Error:', result.message);
    }
  };
};
```

### En un componente de Registro:
```jsx
const RegisterComponent = () => {
  const handleRegister = async (userData) => {
    const result = await post('/registro', userData);
    
    if (result.success) {
      console.log('Usuario registrado:', result.data.user);
    } else {
      console.error('Error:', result.message);
    }
  };
};
```

### En un componente de Recuperación de Contraseña:
```jsx
const RecoverPasswordComponent = () => {
  const handleResetRequest = async (email) => {
    const result = await post('/recuperar-contrasena', { email });
    
    if (result.success) {
      console.log('Email enviado:', result.message);
    } else {
      console.error('Error:', result.message);
    }
  };
};
```

### Con manejo de respuestas mejorado:
```jsx
const ComponentWithErrorHandling = () => {
  const handleApiCall = async (url, data) => {
    const result = await handleApiResponse(
      post(url, data)
    );
    
    // La respuesta ya está procesada y logueada
    return result;
  };
};
```

## 🛣️ URLs/Endpoints Disponibles

### Autenticación:
- `/login`, `/iniciarsecion`, `/signin`
- `/register`, `/registro`, `/signup`
- `/logout`, `/cerrarsesion`, `/signout`

### Usuario:
- `/profile`, `/perfil`, `/user`
- `/validate-token`, `/validar-token`, `/verify-token`

### Recuperación de Contraseña:
- `/forgot-password`, `/recuperar-contrasena`, `/solicitar-recuperacion`
- `/verify-reset-token`, `/verificar-token-reset`
- `/reset-password`, `/cambiar-contrasena`, `/nueva-contrasena`
- `/validate-email`, `/validar-email`

## Ejemplos de uso tradicional (directo)

### En un componente de Login (método anterior):
```jsx
import { login } from '../conection/MockConection';

const LoginComponent = () => {
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    
    if (result.success) {
      // Guardar token y redireccionar
      localStorage.setItem('token', result.data.token);
      console.log('Usuario logueado:', result.data.user);
    } else {
      // Mostrar error
      console.error('Error:', result.message);
    }
  };
};
```

### En un componente de Recuperación de Contraseña (método anterior):
```jsx
import { requestPasswordReset } from '../conection/MockConectionRecoveryPassword';

const RecoverPasswordComponent = () => {
  const handleResetRequest = async (email) => {
    const result = await requestPasswordReset(email);
    
    if (result.success) {
      // Mostrar mensaje de éxito
      console.log('Email enviado:', result.message);
    } else {
      // Mostrar error
      console.error('Error:', result.message);
    }
  };
};
```

## Usuarios de prueba disponibles

Los siguientes usuarios están disponibles para testing:

1. **usuario@ejemplo.com** / 123456
2. **admin@test.com** / admin123
3. **test@gmail.com** / test123

## Notas importantes

- Todas las funciones incluyen un delay simulado para imitar la latencia de red
- Los datos se almacenan en memoria y se reinician al recargar la página
- Los tokens de recuperación expiran en 15 minutos
- Los tokens de sesión expiran en 24 horas
- Las respuestas siguen el formato: `{ success: boolean, message: string, data: object|null }`