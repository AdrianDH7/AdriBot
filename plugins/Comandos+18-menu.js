/* Código Hecho Por GataNina-Li y Modificado Por WillZek
- https://github.com/GataNina-Li
- https://github.com/WillZek 
*/

import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, args, usedPrefix: _p, __dirname, isOwner, text, isAdmin, isROwner }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) throw `Los comandos +18 están desactivados. Usa #on para activar.`
    try {
        let { exp, limit, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = xpRange(level, global.multiplier)

        let d = new Date(new Date + 3600000)
        let locale = 'es'
        let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
        let week = d.toLocaleDateString(locale, { weekday: 'long' })
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
        let _uptime = process.uptime() * 1000
        let _muptime
        if (process.send) {
            process.send('uptime')
            _muptime = await new Promise(resolve => {
                process.once('message', resolve)
                setTimeout(resolve, 1000)
            }) * 1000
        }
        let { money } = global.db.data.users[m.sender]
        let muptime = clockString(_muptime)
        let uptime = clockString(_uptime)
        let totalreg = Object.keys(global.db.data.users).length
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
        let replace = {
            '%': '%',
            p: _p, uptime, muptime,
            me: conn.getName(conn.user.jid),

            exp: exp - min,
            maxexp: xp,
            totalexp: exp,
            xp4levelup: max - exp,

            level, limit, weton, week, date, time, totalreg, rtotalreg, role,
            readmore: readMore
        }
        text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let mentionedJid = [who]
        let username = conn.getName(who)
        let user = global.db.data.users[m.sender]

        let pp = './storage/img/catalogo.jpg'
        let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }
        let fsizedoc = '1'.repeat(10)
        let adReply = { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: { forwardingScore: fsizedoc, externalAdReply: { showAdAttribution: true, title: 'Menu +18', body: 'By WillZek' + username, mediaUrl: canal, description: null, previewType: 'PHOTO', thumbnail: await (await fetch('url')).buffer(), sourceUrl: canal }}}

        let menuA = `😏 Bienvenido *${username}*`.trim()
        let menuB = `╭┄〔 *Menú* 〕┄⊱
┊ *${week}, ${date}*
┊ *Usuarios: ${Object.keys(global.db.data.users).length}* 
┊
┊ *Rol:* ${role}
┊ *Nivel:* ${level}*
┊ *Menu +18:* ${user.premiumTime > 0 ? '✅' : '❌'}
╰┄┄┄┄〔 *𓃠* 〕┄┄┄┄⊱

⠇ Menu 🔞
∘ _${usedPrefix}nsfwloli_
∘ _${usedPrefix}nsfwfoot_
∘ _${usedPrefix}nsfwass_
∘ _${usedPrefix}nsfwbdsm_
∘ _${usedPrefix}nsfwcum_
∘ _${usedPrefix}nsfwero_
∘ _${usedPrefix}nsfwfemdom_
∘ _${usedPrefix}nsfwfoot_
∘ _${usedPrefix}nsfwglss_
∘ _${usedPrefix}nsfworgy_
∘ _${usedPrefix}pies_
∘ _${usedPrefix}yuri_
∘ _${usedPrefix}yuri2_ 
∘ _${usedPrefix}yaoi_
∘ _${usedPrefix}yaoi2_
∘ _${usedPrefix}panties_ 
∘ _${usedPrefix}tetas_ 
∘ _${usedPrefix}booty_
∘ _${usedPrefix}ecchi_
∘ _${usedPrefix}furro_
∘ _${usedPrefix}hentai_
∘ _${usedPrefix}trapito_
∘ _${usedPrefix}imagenlesbians_
∘ _${usedPrefix}pene_
∘ _${usedPrefix}porno_
∘ _${usedPrefix}porno2_
∘ _${usedPrefix}randomxxx_
∘ _${usedPrefix}pechos_
∘ _${usedPrefix}pack_
∘ _${usedPrefix}pack2_
∘ _${usedPrefix}pack3_
∘ _${usedPrefix}videoxxx_

⠇ Videos 🥵
∘ _${usedPrefix}pornovideo | pornovid_
∘ _${usedPrefix}pornovidgay | pornogayv_
∘ _${usedPrefix}pornolesbivid | pornolesbiv_
∘ _${usedPrefix}pornobisexualvid | pornobiv_

⠇ Buscador ❤️‍🔥
∘ _${usedPrefix}xnxxsearch | buscarxnxx *texto*_
∘ _${usedPrefix}xvideossearch *texto*_
∘ _${usedPrefix}xnxxdl | xnxx *enlace*_
∘ _${usedPrefix}xvideosdl | xvideos *enlace*_

⠇ Más 🔥
∘ _${usedPrefix}pornopremium_
`.trim()

await conn.sendMessage(m.chat, { text: menuA + '\n' + menuB, mentions: mentionedJid }, { quoted: m, contextInfo: fkontak })

} catch (e) {
    await conn.sendMessage(m.chat, { text: `\nTítulo`, footer: 'Error al ejecutar el comando. #report ' + usedPrefix + command }, { quoted: m })
    console.log(e)        
}}

handler.help = ['infomenu'].map(v => v + 'able <opción>')
handler.tags = ['grupo', 'propietario']
handler.command = /^(hornymenu)$/i
handler.exp = 50
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}