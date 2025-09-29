import React, { useEffect, useState } from "react";
import movements from "../data/movements.json";
import cards from "../data/cards.json";
import MovementList from "./MovementList";
import "../styles/cardDetail.css";
import { useNavigate } from "react-router-dom";

const maskNumber = (num) => {
  if (!num) return "";
  return num.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 **** **** $4");
};

const CardDetail = ({ cardId }) => {
  const [card, setCard] = useState(null);
  const [cardMovements, setCardMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const selectedCard = cards.find((c) => c.id === cardId);
      if (!selectedCard) throw new Error("Tarjeta no encontrada");

      const relatedMovements = movements.filter((m) => m.card_id === cardId);

      setCard(selectedCard);
      setCardMovements(relatedMovements);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cardId]);

  if (loading) return <p className="state-msg" role="status">Cargando...</p>;
  if (error) return <p className="state-msg error" role="alert">Error: {error}</p>;
  if (!card) return <p className="state-msg empty" role="alert">No se encontró la tarjeta</p>;

  return (
    <section className="card-detail" aria-labelledby="card-title">
      {/* Botón de volver con accesibilidad */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Volver a la página anterior"
      >
        ← Volver
      </button>

      {/* Encabezado de tarjeta */}
      <header className={`card-header ${card.type.toLowerCase()}`}>
        <h1 id="card-title">{card.type} • {card.currency}</h1>
        <p aria-label={`Número de tarjeta ${maskNumber(card.number)}`}>
          {maskNumber(card.number)}
        </p>
        <p aria-label={`Titular ${card.holder}`}>Titular: {card.holder}</p>
        <p aria-label={`Fecha de expiración ${card.expiry}`}>Exp: {card.expiry}</p>
        <p aria-label={`Límite ${card.limit.toLocaleString()} ${card.currency}`}>
          Límite: {card.limit.toLocaleString()} {card.currency}
        </p>
        <p aria-label={`Saldo actual ${card.balance.toLocaleString()} ${card.currency}`}>
          Saldo actual: {card.balance.toLocaleString()} {card.currency}
        </p>
      </header>

      {/* Lista de movimientos accesible */}
      <section aria-labelledby="movimientos-title">
        <h2 id="movimientos-title">Movimientos</h2>
        <MovementList movements={cardMovements} />
      </section>
    </section>
  );
};

export default CardDetail;
