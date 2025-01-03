// Código Hecho Por AdriBot wa.me/5646069199
let handler = async (m, { conn }) => {
// Aqui Pueden Cambiar la reacción si gustan pijes
m.react('💫');
// Dejen Créditos xd
const message = "*AQUI ESTAN LOS PRECIOS.*\n\n> 1 semana de spma= 1k de diamantes\n\n> 5 días = 800 diamantes\n\n> 3 días =500 diamantes";
if (m.isGroup) {
// la del se saca con el tourl
const imageUrl = 'https://i.ibb.co/f8W3cKd/file.jpg'; // Aqui ponen la url perres
// No Quiten Los Créditos 😑 
await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['precios1'];
handler.tags = ['main'];
handler.command = ['precios1', 'p1', 'precio1'];
handler.group = true;
export default handler;