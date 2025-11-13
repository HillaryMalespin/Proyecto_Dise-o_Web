import React, { useState, useRef, useEffect } from "react";
import "../styles/ModalChatBot.css";
import dataIA from "./dataIA/dataIA.json"; 

const ModalChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 0, role: "bot", text: "Hola 👋, soy el asistente virtual del Banco Órbita. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  // Obtener API Key del .env o localStorage
  const getApiKey = () => {
    return import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem("OPENAI_API_KEY");
  };

  const [apiKey] = useState(getApiKey());

  console.log("Usando API Key:", apiKey);

  // Respuestas locales (sin usar la API)
  const buscarRespuestaLocal = (texto) => {
    const lower = texto.toLowerCase();
    let respuesta = null;

    if (lower.includes("transferencia")) {
      respuesta = dataIA.common_user_flows.transferencias?.example_response_transfer;
    } else if (lower.includes("contraseña")) {
      respuesta = dataIA.common_user_flows.recuperar_contraseña?.errors_and_tips?.join(" ");
    } else if (lower.includes("saldo") || lower.includes("cuenta")) {
      respuesta = dataIA.common_user_flows.ver_cuentas_y_detalle?.steps?.join(" ");
    } else if (lower.includes("chatbot")) {
      respuesta = dataIA.sample_prompts_and_responses?.example_response_chatbot_issue;
    }

    return respuesta;
  };

  // Envío del mensaje
  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setError(null);

    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Buscar respuesta local primero
    const respuestaLocal = buscarRespuestaLocal(text);
    if (respuestaLocal) {
      const botMsg = { id: Date.now() + 1, role: "bot", text: respuestaLocal };
      setMessages((m) => [...m, botMsg]);
      setLoading(false);
      return;
    }

    try {
      // Construir el contexto de la conversación
      const conversation = [
        "Eres un asistente bancario amable y profesional. Usa respuestas breves y claras. Evita utilizar rutas de archivos y enfócate en dar pasos prácticos.",
        ...messages.map((m) => `${m.role === "bot" ? "Asistente" : "Usuario"}: ${m.text}`),
        `Usuario: ${text}`,
      ].join("\n");

      // Llamada al nuevo endpoint de OpenAI (válido para sk-proj-)
      const res = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 
          input: conversation,
          max_output_tokens: 500,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error ${res.status}: ${errText}`);
      }

      const data = await res.json();

      // Extraer texto de la nueva estructura de la API
      const botText =
        data?.output?.[0]?.content?.[0]?.text?.trim() ||
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
        <h2>Asistente Banco Órbita</h2>
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
