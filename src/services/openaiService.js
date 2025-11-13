import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Lee la clave del .env
  dangerouslyAllowBrowser: true, // ⚠️ Solo en desarrollo
});

export async function sendToOpenAI(messages) {
  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini", // o "gpt-4o"
      input: messages,
    });
    return response.output_text;
  } catch (error) {
    console.error("Error en OpenAI:", error);
    throw new Error("No se pudo obtener respuesta del modelo.");
  }
}
