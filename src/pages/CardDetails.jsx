import React, { useEffect, useState } from "react";
import movements from "../data/movements.json";
import cards from "../data/cards.json";
import MovementList from "./MovementList";
import "../styles/cardDetail.css";

const maskNumber = (num) => {
  if (!num) return "";
  return num.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 **** **** $4");
};

const CardDetail = ({ cardId }) => {
  const [card, setCard] = useState(null);
  const [cardMovements, setCardMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="state-msg">Cargando...</p>;
  if (error) return <p className="state-msg error">Error: {error}</p>;
  if (!card) return <p className="state-msg empty">No se encontró la tarjeta</p>;

  return (
    <div className="card-detail">
      {/* Encabezado de tarjeta */}
      <div className={`card-header ${card.type.toLowerCase()}`}>
        <h2>{card.type} • {card.currency}</h2>
        <p>{maskNumber(card.number)}</p>
        <p>Titular: {card.holder}</p>
        <p>Exp: {card.expiry}</p>
        <p>Límite: {card.limit.toLocaleString()} {card.currency}</p>
        <p>Saldo actual: {card.balance.toLocaleString()} {card.currency}</p>
      </div>

      {/* Movimientos */}
      <MovementList movements={cardMovements} />
    </div>
  );
};

export default CardDetail;
