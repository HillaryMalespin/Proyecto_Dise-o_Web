import React from "react";

const MovementItem = ({ movement }) => {
  const { date, type, description, currency, amount } = movement;

  return (
    <li className={`movement-item ${type.toLowerCase()}`}>
      <div>
        <p className="desc">{description}</p>
        <p className="date">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="amount">
        <span className={amount < 0 ? "negative" : "positive"}>
          {amount < 0 ? "-" : "+"}{currency} {Math.abs(amount).toFixed(2)}
        </span>
      </div>
    </li>
  );
};

export default MovementItem;
