"use strict";
// Importamos la librería que lee el archivo .env
require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

// Leemos la clave secreta desde las variables de entorno del sistema
const API_KEY = process.env.GEMINI_API_KEY;

// Verificamos que la clave exista antes de continuar
if (!API_KEY) {
    console.error("❌ ERROR: No se encontró la GEMINI_API_KEY en el archivo .env");
    process.exit(1); // Detenemos la ejecución del programa
}

const genAI = new GoogleGenAI(API_KEY);

async function consultarIA(mensajeUsuario) {
    try {
        const interaction = await genAI.interactions.create({
            model: "gemini-3.8-flash",
            input: `${mensajeUsuario}`,
        });
        // Retornamos el texto de la respuesta
        return interaction.output_text;
        
    } catch (error) {
        console.error("❌ Error conectando con Gemini:", error.message);
        return "Lo siento, mi conexión está fallando en este momento.";
    }
}

module.exports = { consultarIA };