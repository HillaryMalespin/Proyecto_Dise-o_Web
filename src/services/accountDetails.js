import { apiRequest } from "../conection/api";

export async function getAccountDetails(iban) {
  const token = localStorage.getItem("token");

  return await apiRequest(
    "GET",
    `/api/v1/accounts/account?iban=${iban}`, 
    null,
    token
  );
}

export async function getAccountMovements(iban) {
  const token = localStorage.getItem("token");

  return await apiRequest(
    "GET",
    `/api/v1/accounts/movements?iban=${iban}`,
    null,
    token
  );
}
