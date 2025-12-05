// services/auth.js
import { apiRequest } from "../conection/api";

export async function login(username, password) {
    const data = await apiRequest(
        "POST",
        "/api/v1/auth/login",
        { username, password }
    );

    localStorage.setItem("token", data.token);

    return data;
}

export async function forgotPassword(email) {
    return apiRequest(
        "POST",
        "/api/v1/auth/forgot-password",
        { email }
    );
}

export async function resetPassword(email, newPassword, otp) {
    return apiRequest(
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
