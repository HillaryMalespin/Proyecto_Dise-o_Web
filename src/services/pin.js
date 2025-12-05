import { apiRequest } from "../conection/api";

export function requestCardOTP(cardId) {
  const token = localStorage.getItem("token");
  return apiRequest(
    "POST",
    `/api/v1/cards/${cardId}/otp?cardId=${cardId}`,
    null,
    token
  );
}

export function verifyCardOTP(cardId, otp) {
  const token = localStorage.getItem("token");
  return apiRequest(
    "POST",
    `/api/v1/cards/${cardId}/view-details?cardId=${cardId}`,
    { otp },
    token
  );
}
