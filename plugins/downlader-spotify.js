let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, `\`\`\`[❤️‍🔥] Por gavor ingresa un link de Spotify. Ejemplo:\n${usedPrefix + command} https://open.spotify.com/intl-es/track/0P0BTqkBQuAlzbwbTEV57m\`\`\``, null, fkontak)
m.react(rwait);
let api = await fetch(`https://api.dorratz.com/spotifydl?url=${args[0]}`);
let res = await api.json();
let { title, duration, url, thumbnail } = res.data;
let { name } = res.data.artist;
    let text = `╭━━━⊜ ⌊ \`Spotify Download\` ⌉⊜━━━\n`
    text += `│  ≡ Nombre: \`${title}\`\n`
    text += `│  ≡ Duración: \`${duration}\`\n`
    text += `│  ≡ Artiste: \`${name}\`\n`
    text += `╰━━━━━━━━━━━━━━⊜\n`
    text += `  _Enviando el archivo . . . ._\n- \`${botname}\` -`
conn.sendFile(m.chat, thumbnail, title + '.jpg', text, m, null, rpl)
/*************/
await conn.sendMessage(m.chat, { audio: { url: url }}, { quoted: fkontak });
m.react('❤️‍🔥');
}
handler.help = ['spotifydl', 'spotify'];
handler.tags = ['downloader'];
handler.command = ['spotifydl', 'spotify'];
handler.prem = true;
export default handler;