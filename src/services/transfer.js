export async function DoInternalTransfer(to, from, amount, currency) {
  const token = localStorage.getItem("token");

  return apiRequest(
        "POST",
        "/api/v1/transfers/internal",
        { to, from, amount, currency },
        token
    );
}

export async function DoInterbankTransfer(to, from, amount, currency) {
  const token = localStorage.getItem("token");

  return apiRequest(
        "POST",
        "/api/v1/transfers/interbank",
        { to, from, amount, currency },
        token
    );
}
