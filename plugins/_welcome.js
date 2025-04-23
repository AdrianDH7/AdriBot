// Módulo de Bienvenida y Despedida

import { smsg } from './lib/simple.js';

// Función para enviar un mensaje de bienvenida
async function sendWelcomeMessage(message, conn) {
    const groupMetadata = await conn.groupMetadata(message.chat);
    const user = groupMetadata.participants.find(u => conn.decodeJid(u.id) === message.sender);
    const groupName = groupMetadata.subject;

    // Mensaje de bienvenida personalizado
    const welcomeMessage = `
    ¡Hola, ${user.pushname}! 👋
    Bienvenido al grupo ${groupName}. 🎉
    Espero que te diviertas mucho aquí. 😊
    `;

    await conn.reply(message.chat, welcomeMessage, message);
}

// Función para enviar un mensaje de despedida
async function sendFarewellMessage(message, conn) {
    const groupMetadata = await conn.groupMetadata(message.chat);
    const user = groupMetadata.participants.find(u => conn.decodeJid(u.id) === message.sender);
    const groupName = groupMetadata.subject;

    // Mensaje de despedida personalizado
    const farewellMessage = `
    Adiós, ${user.pushname}. 😔
    Espero verte de nuevo pronto en el grupo ${groupName}. 👋
    `;

    await conn.reply(message.chat, farewellMessage, message);
}

// Código para el manejo de mensajes del módulo de bienvenida y despedida
export async function handler(chatUpdate) {
    // ... (código existente) ...

    // --- Bienvenida y Despedida ---
    if (chatUpdate.type === 'group-participants.update' && !chatUpdate.participants.includes(conn.decodeJid(global.conn.user.id))) {
        const isWelcome = global.db.data.chats[message.chat].welcome; 

        // Comprueba si la configuración de bienvenida está activada
        if (isWelcome) {
            for (let participant of chatUpdate.participants) {
                if (chatUpdate.action === 'add') {
                    await sendWelcomeMessage(message, conn);
                } else if (chatUpdate.action === 'remove') {
                    await sendFarewellMessage(message, conn);
                }
            }
        }
    }

    // ... (código existente) ...
}

