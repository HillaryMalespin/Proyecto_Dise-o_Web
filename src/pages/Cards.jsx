import React from "react";
import "../styles/cards.css";
import cards from "../data/cards.json";

const maskNumber = (num) => {
  // Fuerza a string y enmascara todo menos los últimos 4 dígitos
  return String(num).replace(/\d(?=\d{4})/g, "*");
};

const CustomCard = ({ type, number, holder, expiry }) => {
  return (
    <div className="custom-card-flip">
      <div className={`custom-card ${type.toLowerCase()}`}>
        {/* Frente */}
        <div className="custom-card-face custom-card-front">
          <div className="custom-card-chip"></div>
          <div className="custom-card-number">{maskNumber(number)}</div>
          <div className="custom-card-footer">
            <span>{holder}</span>
            <span>{expiry}</span>
          </div>
        </div>

        {/* Reverso */}
        <div className="custom-card-face custom-card-back">
          <div className="custom-magnetic-strip"></div>
          <div className="custom-cvv-box">***</div>
        </div>
      </div>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="custom-card-container">
      {cards.map((card, index) => (
        <CustomCard
          key={index}
          type={card.type}
          number={card.number}
          holder={card.holder}
          expiry={card.expiry}
        />
      ))}
    </div>
  );
};

export default Cards;
