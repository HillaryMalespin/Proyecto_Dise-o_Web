// Cards.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cards.css";

import { getCards } from "../services/cards";
import PinQuery from "./pinQuery/PinQuery"; //

const CustomCard = ({ card, onPinRequest }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const maskNumber = (num) => {
    if (!num) return "";
    return num.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1 **** **** $4");
  };

  // Nombre del titular usando email del usuario
  const holder =
    card.iduser === user.id
      ? user.email.split("@")[0].replace(".", " ").toUpperCase()
      : card.iduser;

  const formattedDate = new Date(card.expdate).toLocaleDateString("es-CR");

  return (
    <div className="custom-card-wrapper">

      {/* Tarjeta */}
      <div
        className="custom-card-flip"
        onClick={() => navigate(`/card/${card.numbercard}`)}
        style={{ cursor: "pointer" }}
      >
        <div className="custom-card gold">

          {/* Frente */}
          <div className="custom-card-face custom-card-front">
            <div className="custom-card-chip"></div>

            <div className="custom-card-number">{maskNumber(card.numbercard)}</div>

            <div className="custom-card-footer">
              <span>{holder}</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Reverso */}
          <div className="custom-card-face custom-card-back">
            <div className="custom-magnetic-strip"></div>
            <div className="custom-cvv-box">***</div>
          </div>
        </div>
      </div>

      {/* BOTÓN PARA CONSULTAR PIN / CVV */}
      <button
        className="pin-button"
        onClick={() => onPinRequest(card.numbercard)}
      >
        Consultar PIN / CVV
      </button>

    </div>
  );
};

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [pinVisible, setPinVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Abrir modal con id correcto
  const handlePinRequest = (cardId) => {
    setSelectedCardId(cardId);
    setPinVisible(true);
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await getCards();

        if (!res.cards) throw new Error("El backend no devolvió tarjetas");

        setCards(res.cards);
      } catch (err) {
        alert("Error cargando tarjetas: " + err.message);
      }
    }

    load();
  }, []);

  return (
    <div className="custom-card-container">
      {cards.map((c, i) => (
        <CustomCard
          key={c.numbercard || i}
          card={c}
          onPinRequest={handlePinRequest}  // 
        />
      ))}

      {/* MODAL PIN QUERY */}
      <PinQuery
        visible={pinVisible}
        onClose={() => setPinVisible(false)}
        cardId={selectedCardId}   // 
      />
    </div>
  );
};

export default Cards;
