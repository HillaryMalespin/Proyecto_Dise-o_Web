import React from "react";

export default function MovementItem({ movement }) {
  const {
    date,
    type = "MOVIMIENTO",
    description = "Sin descripción",
    currency = "CRC",
    amount = movement.amount ?? movement.ammount ?? 0,
  } = movement;

  const formattedDate = new Date(date).toLocaleDateString();

  const isNegative = amount < 0;
  const sign = isNegative ? "-" : "+";
  const absAmount = Math.abs(Number(amount)).toFixed(2);

  return (
    <li className="movement-item">
      <div>
        <p className="desc">{description}</p>
        <p className="date">{formattedDate}</p>
      </div>

      <div className="amount">
        <span className={isNegative ? "negative" : "positive"}>
          {sign} {currency} {absAmount}
        </span>
      </div>
    </li>
  );
}
