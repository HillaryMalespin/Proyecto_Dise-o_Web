import React from "react";
import "../styles/cards.css";
import cardsData from "../data/cards.json";

const Cards = () => {
  return (
    <div className="card-container">
      {cardsData.map((card, index) => (
        <div key={index} className="card-flip">
          <div className={`card ${card.type.toLowerCase()}`}>
            
            {/* Frente */}
            <div className="card-face card-front">
              <div className="card-header">
                <span>{card.bank}</span>
                <span>{card.type}</span>
              </div>
              <div className="card-chip"></div>
              <div className="card-number">{card.number}</div>
              <div className="card-footer">
                <span>{card.holder}</span>
                <span>{card.expiry}</span>
              </div>
            </div>

            {/* Reverso */}
            <div className="card-face card-back">
              <div className="magnetic-strip"></div>
              <div className="cvv-box">{card.cvv}</div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
