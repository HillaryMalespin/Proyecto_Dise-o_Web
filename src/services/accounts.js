// services/accounts.js
import { apiRequest } from "../conection/api";

export async function getAccounts(iduser) {
    const token = localStorage.getItem("token");

    return apiRequest(
        "GET",
        `/api/v1/accounts/x?id=${iduser}`,
        null,
        token
    );
}

export async function getMovements(idaccount) {
    return apiRequest("GET", `/api/v1/account/movements/${idaccount}`);
}

// 🔥 Obtener detalles según backend: requiere ?accountId=### (NO IBAN)
export async function getAccountDetail(idaccount) {
    const token = localStorage.getItem("token");

    return apiRequest(
        "GET",
        `/api/v1/account/${idaccount}?accountId=${idaccount}`,
        null,
        token
    );
}
