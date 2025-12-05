
const API_URL = import.meta.env.VITE_API_URL || "https://api.srlgestock.space";
console.log("API_URL =", API_URL);

export async function apiRequest(method, endpoint, body = null, token = null) {
    const headers = { "Content-Type": "application/json" };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    let data = {};
    try {
        data = await response.json();
    } catch (_) {}

    if (!response.ok || data?.error) {
        throw {
            status: response.status,
            message: data?.error?.message ?? data?.error ?? "Error desconocido",
        };
    }

    return data;
}
