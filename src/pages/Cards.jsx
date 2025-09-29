import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cards.css";
import cards from "../data/cards.json";

const CustomCard = ({ id, type, number, holder, expiry }) => {
  const navigate = useNavigate();

  const maskNumber = (num) => {
    if (!num) return "";
    return num.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 **** **** $4");
  };

  return (
    
    <div
      className="custom-card-flip"
      
      onClick={() => navigate(`/card/${id}`)} // Navegar al detalle
      style={{ cursor: "pointer" }}
    >
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
          id={card.id}  
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
