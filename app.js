"use strict";
const { iniciarChat, cicloChat, despedida } = require('./chat/chatManager.js');

async function main() {
    // 1. Iniciamos los recursos y pedimos credenciales
    let usuario = await iniciarChat();
    
    // 2. Cedemos el control al ciclo asíncrono infinito
    await cicloChat(usuario);
    
    // 3. Cerramos limpiamente cuando el usuario decida salir
    despedida(usuario);
}

// Control de errores de alto nivel para todo el programa
main().catch(error => {
    console.error("Fallo crítico en la aplicación:", error);
});