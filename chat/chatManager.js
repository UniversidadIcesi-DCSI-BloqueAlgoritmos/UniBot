"use strict";
const readline = require('readline/promises');
const { consultarIA } = require('../utils/geminiService.js');

const consola = readline.createInterface({ input: process.stdin, output: process.stdout });

async function iniciarChat() {
    console.log("==========================================");
    console.log("🚀 TERMINAL CONECTADA A GEMINI AI");
    console.log("==========================================");
    let nombre = await consola.question("👤 Identifícate: ");
    console.log(`\n🤖 ¡Hola, ${nombre}! Soy un asistente de IA. Escribe 'salir' para desconectarme.\n`);
    return nombre;
}

async function cicloChat(nombre) {
    let mensaje = "";
    
    while (mensaje.toLowerCase() !== "salir") {
        mensaje = await consola.question(`${nombre} > `);
        
        if (mensaje.toLowerCase() !== "salir") {
            // Animación visual simple en consola mientras esperamos
            process.stdout.write("🤖 Pensando..."); 
            
            // Aquí ocurre la magia: esperamos la respuesta de la API externa
            let respuestaGemini = await consultarIA(mensaje);
            
            // Borramos el "Pensando..." e imprimimos la respuesta real
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            console.log(`🤖 Gemini: ${respuestaGemini}\n`);
        }
    }
}

function despedida(nombre) {
    console.log(`\n=== CONEXIÓN TERMINADA. ¡Hasta la próxima, ${nombre}! ===`);
    consola.close();
}

module.exports = { iniciarChat, cicloChat, despedida };