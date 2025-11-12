import React, { useState, useRef, useEffect } from "react";

const ModalChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", text: "Hola, ¿en qué puedo ayudarte?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const getApiKey = () =>
    process.env.REACT_APP_OPENAI_API_KEY || window.localStorage.getItem("OPENAI_API_KEY");

  const sendMessage = async (e) => {
    e && e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setError(null);

    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const apiKey = getApiKey();
    if (!apiKey) {
      setError(
        "Falta API key. Configure REACT_APP_OPENAI_API_KEY en .env (build time) o OPENAI_API_KEY en localStorage."
      );
      setLoading(false);
      return;
    }

    try {
      // Construir historial para la API (system + chat)
      const apiMessages = [
        { role: "system", content: "Eres un asistente útil y conciso." },
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
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
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
      const botText = data?.choices?.[0]?.message?.content?.trim() || "No obtuve respuesta.";

      const botMsg = { id: Date.now() + 1, role: "bot", text: botText };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      setError(err.message || "Error en la petición al chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-chat-bot" role="dialog" aria-modal="true">
      <header className="modal-header">
        <h2>Chat Bot</h2>
        {onClose && (
          <button className="close-btn" onClick={() => onClose(false)} aria-label="Cerrar">
            ×
          </button>
        )}
      </header>

      <div className="chat-body" ref={listRef} style={{ maxHeight: "50vh", overflowY: "auto" }}>
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.role}`}>
            <div className="message-role">{m.role === "bot" ? "Bot" : "Tú"}</div>
            <div className="message-text">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-role">Bot</div>
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

      {error && <div className="chat-error" role="alert">{error}</div>}
    </div>
  );
};

export default ModalChatBot;