import { apiRequest } from "../conection/api";

// LOGIN
export async function login(username, password) {
    const data = await apiRequest(
        "POST",
        "/api/v1/auth/login",
        { username, password }
    );

    // Guardar token
    localStorage.setItem("token", data.token);

    return data;
}

// RECUPERAR CONTRASEÑA
export async function forgotPassword(email) {
    return await apiRequest(
        "POST",
        "/api/v1/auth/forgot-password",
        { email }
    );
}

// RESTABLECER CONTRASEÑA
export async function resetPassword(email, newPassword, otp) {
    return await apiRequest(
        "POST",
        "/api/v1/auth/reset-password",
        { email, newPassword, otp }
    );
}

export function getToken() {
    return localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
}
