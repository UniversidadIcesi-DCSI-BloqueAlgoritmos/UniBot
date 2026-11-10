"use strict";
require("dotenv").config();

const MODEL_ID = process.env.LOCAL_MODEL_ID || "onnx-community/Qwen2.5-1.5B-Instruct";
const MODEL_DTYPE = process.env.LOCAL_MODEL_DTYPE || "q4";

// ============================================================================
// CONTEXTO OPCIONAL:
// - Si tiene texto: el modelo lo usará para responder sobre este tema, pero
//   también responderá preguntas generales.
// - Si lo dejas vacío (""), funcionará como un asistente general libre.
// ============================================================================
const CONTEXTO_BASE = `
Reglamento y Servicios del Laboratorio de Prototipado (UniLab - Edificio B, Piso 3):
- Horario de atención: Lunes a viernes de 8:00 AM a 6:00 PM, y sábados de 9:00 AM a 1:00 PM.
- Equipos disponibles: 6 impresoras 3D de filamento PLA, 2 cortadoras láser y 10 estaciones con GPU para inteligencia artificial.
- Reservas: Todo estudiante debe reservar turno con al menos 24 horas de anticipación desde el portal web institucional. El tiempo máximo de uso por sesión es de 3 horas.
- Costos y materiales: El uso de las máquinas es gratuito para estudiantes activos, pero cada usuario debe traer su propio filamento PLA o láminas de madera MDF (máximo 4 mm de grosor).
- Coordinador del laboratorio: Ing. Carlos Mendoza (correo: cmendoza@unibot.edu). En caso de emergencia eléctrica, activar el botón rojo junto a la puerta principal.
`;

let generator = null;

async function inicializarModelo() {
    if (!generator) {
        const { pipeline } = await import("@huggingface/transformers");
        console.log(`📦 Cargando modelo local [${MODEL_ID}] (${MODEL_DTYPE})...`);
        generator = await pipeline("text-generation", MODEL_ID, {
            dtype: MODEL_DTYPE,
        });
    }
    return generator;
}

/**
 * Consulta al modelo local con soporte opcional de contexto.
 * @param {string} pregunta - Entrada del usuario.
 * @param {string} [contexto=CONTEXTO_BASE] - Contexto opcional (puede ser "" o null).
 */
async function consultarIA(pregunta, contexto = CONTEXTO_BASE) {
    try {
        const llm = await inicializarModelo();
        const tieneContexto = typeof contexto === "string" && contexto.trim().length > 0;

        // Construimos los mensajes según exista o no un contexto activo
        const messages = tieneContexto
            ? [
                  {
                      role: "system",
                      content:
                          "Eres UniBot, un asistente virtual útil, claro y conciso. " +
                          "Tienes acceso a un bloque de <contexto>. Si la pregunta del usuario está relacionada con ese contexto, úsalo para dar una respuesta exacta. " +
                          "Si el usuario hace una pregunta general, un saludo o pide una instrucción básica que no tiene que ver con el contexto, respóndela normalmente usando tu conocimiento general en español.",
                  },
                  {
                      role: "user",
                      content: `<contexto>\n${contexto.trim()}\n</contexto>\n\nUsuario: ${pregunta.trim()}`,
                  },
              ]
            : [
                  {
                      role: "system",
                      content:
                          "Eres UniBot, un asistente de inteligencia artificial ejecutándose localmente. " +
                          "Responde en español de manera clara, breve y bien estructurada a cualquier pregunta o instrucción del usuario.",
                  },
                  {
                      role: "user",
                      content: pregunta.trim(),
                  },
              ];

        const output = await llm(messages, {
            max_new_tokens: 256,
            temperature: 0.3,        // Balance ideal entre precisión y fluidez natural
            top_p: 0.9,
            do_sample: true,
            repetition_penalty: 1.1,
            return_full_text: false,
        });

        const generado = output[0].generated_text;

        if (Array.isArray(generado)) {
            return generado[generado.length - 1].content.trim();
        }
        if (typeof generado === "object" && generado !== null && generado.content) {
            return generado.content.trim();
        }
        return String(generado).trim();

    } catch (error) {
        console.error("\n❌ Error ejecutando el modelo local:", error.message);
        return "Lo siento, ocurrió un fallo al procesar la respuesta localmente.";
    }
}

module.exports = { inicializarModelo, consultarIA };