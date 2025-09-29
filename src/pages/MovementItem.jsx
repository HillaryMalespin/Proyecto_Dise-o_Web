import React from "react";

const MovementItem = ({ movement }) => {
  const { date, type, description, currency, amount } = movement;

  const formattedDate = new Date(date).toLocaleDateString();
  const isNegative = amount < 0;
  const sign = isNegative ? "-" : "+";
  const absAmount = Math.abs(amount).toFixed(2);

  // Descripción accesible del ítem
  const itemLabel = `Movimiento del ${formattedDate}, tipo ${type}, descripción ${description}, monto ${sign}${absAmount} ${currency}`;

  return (
    <li
      className={`movement-item ${type.toLowerCase()}`}
      aria-label={itemLabel}
    >
      <div>
        <p className="desc">{description}</p>
        <p className="date">{formattedDate}</p>
      </div>
      <div className="amount">
        <span
          className={isNegative ? "negative" : "positive"}
          aria-label={`Monto ${isNegative ? "débito" : "crédito"} de ${absAmount} ${currency}`}
        >
          {sign}{currency} {absAmount}
        </span>
      </div>
    </li>
  );
};

export default MovementItem;
