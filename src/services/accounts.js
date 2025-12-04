import { apiRequest } from "../conection/api";

export async function getAccounts(identification) {
  return await apiRequest(
    "GET",
    `/api/v1/accounts/${identification}`, // Backend requiere /:id
    null,
    localStorage.getItem("token")
  );
}
