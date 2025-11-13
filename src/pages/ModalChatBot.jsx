import React, { useState, useRef, useEffect } from "react";
import "../styles/ModalChatBot.css";
import dataIA from "./dataIA/dataIA.json"

const ModalChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", text: "Hola 👋, soy el asistente virtual del Banco órbita. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const API_KEY = "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";

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setError(null);

    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = [
        { role: "system", content: "Eres un asistente bancario amable y profesional. Responde de forma breve y clara." },
        ...messages.map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.text,
        })),
        { role: "user", content: text },
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const botText =
        data?.choices?.[0]?.message?.content?.trim() ||
        "No obtuve respuesta. Por favor, intenta de nuevo.";

      const botMsg = { id: Date.now() + 1, role: "bot", text: botText };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      setError(err.message || "Error en la comunicación con OpenAI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-chat-bot" role="dialog" aria-modal="true">
      <header className="modal-header">
        <h2>💬 Asistente Banco Órbita</h2>
        {onClose && (
          <button className="close-btn" onClick={() => onClose(false)} aria-label="Cerrar">
            ×
          </button>
        )}
      </header>

      <div className="chat-body" ref={listRef} style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.role}`}>
            <div className="message-role">{m.role === "bot" ? "🤖 Bot" : "🧑 Tú"}</div>
            <div className="message-text">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-role">🤖 Bot</div>
            <div className="message-text">Escribiendo...</div>
          </div>
        )}
      </div>

      <form className="chat-form" onSubmit={sendMessage}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          rows={2}
          disabled={loading}
          aria-label="Mensaje"
        />
        <div className="form-actions">
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>

      {error && <div className="chat-error" role="alert">⚠️ {error}</div>}
    </div>
  );
};

export default ModalChatBot;
