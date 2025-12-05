import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCardDetail, getCardMovements } from "../services/cards";
import MovementList from "./MovementList"; 
import "../styles/cardDetail.css";

function getHolderName() {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;
  if (!email) return "Titular desconocido";

  const namePart = email.split("@")[0]; //
  return namePart
    .split(".")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}


const maskNumber = (num) => {
  if (!num) return "";
  return num.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 **** **** $4");
};

export default function CardDetail() {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resCard = await getCardDetail(cardId);
        const data = resCard.card ?? resCard.data ?? null;

        if (!data) throw new Error("No se pudo cargar la tarjeta");
        setCard(data);

        const resMov = await getCardMovements(cardId);
        const raw = resMov.movements ?? resMov.data ?? [];

        const fixed = raw.map((m, i) => ({
          id: m.id ?? i,
          date: m.date ?? m.created_at ?? new Date(),
          type: m.type ?? "MOVIMIENTO",
          description: m.description ?? "Sin descripción",
          currency: m.currency ?? "CRC",
          amount: m.amount ?? m.ammount ?? 0, //
        }));

        setMovements(fixed);
      } catch (err) {
        alert("Error cargando detalles: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [cardId]);


  if (loading) return <p className="state-msg">Cargando...</p>;
  if (!card) return <p className="state-msg">No se encontró esta tarjeta</p>;

  return (
    <section className="card-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <header className="card-header gold">
        <h1>{card.type ?? "Tarjeta"}</h1>

        <p>{maskNumber(card.numbercard)}</p>

        <p>Titular: {card.holdername ?? getHolderName()}</p>

        <p>Exp: {card.expdate?.split("T")[0] ?? "N/A"}</p>
      </header>

      <section>
        <h2>Movimientos</h2>
        <MovementList movements={movements} />
      </section>
    </section>
  );
}
