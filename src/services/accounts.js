// services/accounts.js
import { apiRequest } from "../conection/api";

export async function getAccounts(iduser) {
    const token = localStorage.getItem("token");

    return apiRequest(
        "GET",
        `/api/v1/accounts/x?id=${iduser}`,  // EL BACKEND ESPERA id (NO identification)
        null,
        token
    );
}

export async function getAccountDetail(iban) {
    return apiRequest("GET", `/api/v1/account/${iban}`);
}

export async function getMovements(idaccount) {
    return apiRequest("GET", `/api/v1/account/movements/${idaccount}`);
}
