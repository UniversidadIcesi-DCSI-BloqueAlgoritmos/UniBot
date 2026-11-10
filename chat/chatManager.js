"use strict";
const readline = require('readline/promises');
const { inicializarModelo, consultarIA } = require('../utils/localLLMService.js');

const consola = readline.createInterface({ input: process.stdin, output: process.stdout });

async function iniciarChat() {
    console.log("==========================================");
    console.log("🚀 TERMINAL CONECTADA A LLM LOCAL (UniBot)");
    console.log("==========================================");

    // Cargamos el modelo en memoria antes de iniciar la conversación
    await inicializarModelo();
    console.log("✅ Modelo cargado y listo.\n");

    let nombre = await consola.question("👤 Identifícate: ");
    console.log(`\n🤖 ¡Hola, ${nombre}! Soy UniBot (ejecutándose localmente). Escribe 'salir' para desconectarme.\n`);
    return nombre;
}

async function cicloChat(nombre) {
    let mensaje = "";
    
    while (mensaje.toLowerCase() !== "salir") {
        mensaje = await consola.question(`${nombre} > `);
        
        if (mensaje.trim() !== "" && mensaje.toLowerCase() !== "salir") {
            // Animación visual simple en consola mientras esperamos
            process.stdout.write("🤖 Pensando..."); 
            
            // Ejecutamos la inferencia local basada en el contexto
            let respuestaLocal = await consultarIA(mensaje);
            
            // Borramos el "Pensando..." e imprimimos la respuesta real
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            console.log(`🤖 UniBot: ${respuestaLocal}\n`);
        }
    }
}

function despedida(nombre) {
    console.log(`\n=== CONEXIÓN TERMINADA. ¡Hasta la próxima, ${nombre}! ===`);
    consola.close();
}

module.exports = { iniciarChat, cicloChat, despedida };