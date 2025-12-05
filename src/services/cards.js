import { apiRequest } from "../conection/api";

/* ---------------------------------------------
   Obtener TODAS las tarjetas del usuario
   Backend: GET /api/v1/cards   (solo requiere token)
----------------------------------------------*/
export async function getCards() {
  const token = localStorage.getItem("token");

  return apiRequest(
    "GET",
    `/api/v1/cards`,
    null,
    token
  );
}

/* ---------------------------------------------
   Obtener detalle de una tarjeta específica
   Backend: GET /api/v1/cards/:cardId?cardId=XXX
   (sí, usa query string aunque la ruta tenga :id)
----------------------------------------------*/
export async function getCardDetail(cardId) {
  const token = localStorage.getItem("token");

  return apiRequest(
    "GET",
    `/api/v1/cards/${cardId}?cardId=${cardId}`,
    null,
    token
  );
}

/* ---------------------------------------------
   Obtener movimientos de la tarjeta
   Backend: GET /api/v1/cards/:cardId/movements?cardId=XXX
   (usa cardId en query, aunque exista la ruta dinámica)
----------------------------------------------*/
export async function getCardMovements(cardId) {
  const token = localStorage.getItem("token");

  return apiRequest(
    "GET",
    `/api/v1/cards/${cardId}/movements?cardId=${cardId}`,
    null,
    token
  );
}
