// Módulo de Minijuegos

import { smsg } from './lib/simple.js';
import { randomInt } from 'crypto';

const preguntasTrivia = [
    {
        pregunta: "¿Cuál es la capital de Francia?",
        respuestas: ["París", "Londres", "Roma", "Madrid"],
        respuestaCorrecta: 0
    },
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        respuestas: ["Marte", "Júpiter", "Saturno", "Tierra"],
        respuestaCorrecta: 1
    },
    // Agrega más preguntas de trivia aquí
];

// Función para iniciar un juego de trivia
async function trivia(message, conn) {
    const preguntaIndex = randomInt(preguntasTrivia.length);
    const pregunta = preguntasTrivia[preguntaIndex];

    const opciones = pregunta.respuestas.map((respuesta, index) => {
        return `${index + 1}. ${respuesta}`;
    });
    const textoPregunta = `
    ¡Trivia! 🧠

    ${pregunta.pregunta}
    ${opciones.join('\n')}

    Responde con el número de la opción correcta.
    `;

    await conn.reply(message.chat, textoPregunta, message);
}

// Función para verificar la respuesta de la trivia
async function checkTriviaAnswer(message, conn) {
    if (!message.text || !parseInt(message.text)) {
        await conn.reply(message.chat, "Por favor, introduce un número válido.", message);
        return;
    }

    const respuesta = parseInt(message.text) - 1;

    // Verifica si la respuesta es correcta
    if (respuesta === preguntasTrivia[preguntaIndex].respuestaCorrecta) {
        await conn.reply(message.chat, "¡Correcto! 🎉", message);
    } else {
        await conn.reply(message.chat, `Incorrecto. La respuesta correcta era ${preguntasTrivia[preguntaIndex].respuestas[preguntasTrivia[preguntaIndex].respuestaCorrecta]}. 😔`, message);
    }
}

// Función para iniciar un juego de adivinanzas
async function adivinanzas(message, conn) {
    const adivinanza = "Tengo cuello pero no cabeza, tengo cuerpo pero no brazos, tengo boca pero no hablo. ¿Qué soy?"; // Ejemplo de adivinanza
    await conn.reply(message.chat, `
    ¡Adivina! 🤔

    ${adivinanza}

    Para responder, envía tu adivinanza.
    `, message);
}

// Función para verificar la respuesta de la adivinanza
async function checkAdivinanzaAnswer(message, conn) {
    const respuesta = message.text.toLowerCase();

    // Verifica si la respuesta es correcta
    if (respuesta === "una botella") { // La respuesta correcta
        await conn.reply(message.chat, "¡Correcto! 🎉", message);
    } else {
        await conn.reply(message.chat, "Incorrecto. Intenta otra vez. 🤔", message);
    }
}

// ... Agrega más juegos y funciones aquí (como Piedra, Papel o Tijeras, etc.) ...

// Código para el manejo de mensajes del módulo de minijuegos
export async function handler(chatUpdate) {
    // ... (código existente) ...

    // --- Minijuegos ---
    if (match && command === 'trivia') {
        await trivia(m, conn);
    } else if (match && command === 'adivina') {
        await adivinanzas(m, conn);
    } else if (match && command === 'checktrivia' && preguntaIndex !== undefined) { // Si la pregunta de la trivia está activa
        await checkTriviaAnswer(m, conn);
    } else if (match && command === 'checkadivina') {
        await checkAdivinanzaAnswer(m, conn);
    }

    // ... (código existente) ...
}

