const { fetchLatestBaileysVersion, useMultiFileAuthState, DisconnectReason } = await import('@whiskeysockets/baileys')
import qrcode from 'qrcode'
import fs from 'fs'
import pino from 'pino'
import { makeWASocket } from '../lib/simple.js'

if (global.conns instanceof Array) {
  console.log()
} else {
  global.conns = []
}

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems}) => {

let parentw = args[0] && args[0] == "plz" ? conn : await global.conn

if (!(args[0] && args[0] == 'plz' || (await global.conn).user.jid == conn.user.jid)) {
return m.reply("Este comando solo puede ser usado en el bot principal! wa.me/" + global.conn.user.jid.split`@`[0x0] + "?text=" + usedPrefix + "serbot")
}

async function serbot() {
    let serbotFolder = m.sender.split('@')[0]
    let folderSub = `./serbot/${serbotFolder}`
    if (!fs.existsSync(folderSub)) {
      fs.mkdirSync(folderSub, { recursive: true })
    }
    if (args[0]) {
      fs.writeFileSync(`${folderSub}/creds.json`, Buffer.from(args[0], 'base64').toString('utf-8'))
    }

    const { state, saveCreds } = await useMultiFileAuthState(folderSub);
    const { version } = await fetchLatestBaileysVersion()

    const connectionOptions = {
      version,
      keepAliveIntervalMs: 30000,
      printQRInTerminal: true,
      logger: pino({ level: "fatal" }),
      auth: state,
      browser: [`【 ✯ Ai Hoshino - MD ✰ 】`, "IOS", "4.1.0"],
    };

    let conn = makeWASocket(connectionOptions)
    conn.isInit = false
    let isInit = true

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin, qr } = update
      if (isNewLogin) {
        conn.isInit = true
      }
      if (qr) {
        let txt = '`–  S E R B O T  -  S U B B O T`\n\n'
            txt += `✩ *Escanea este QR para ser en un Sub Bot*\n`
            txt += `✩ Pasos para escanear\n`
            txt += `✩ *1* : Haga click en los 3 puntos\n`
            txt += `✩ *2* : Toque dispositivos vinculados\n`
            txt += `✩ *3* : Escanea este QR\n\n`
            txt += `> *Nota:* Este código QR expira en 30 segundos.`
        let sendQR = await parentw.sendFile(m.chat, await qrcode.toDataURL(qr, { scale: 8 }), "qrcode.png", txt, m, null, rcanal)

       setTimeout(() => {
         parentw.sendMessage(m.chat, { delete: sendQR.key })
       }, 30000)

      }
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
      if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        let i = global.conns.indexOf(conn)
        if (i < 0) {
          return console.log(await creloadHandler(true).catch(console.error))
        }
        delete global.conns[i]
        global.conns.splice(i, 1)
        if (code !== DisconnectReason.connectionClosed) {
          await parentw.reply(conn.user.jid, "Conexión perdida...", m, rcanal)
        }
      }
      if (global.db.data == null) {
        loadDatabase()
      }
      if (connection == "open") {
        conn.isInit = true
        global.conns.push(conn)
        await parentw.reply(m.chat, args[0] ? 'Conectado con exito' : '*\`[ Conectado Exitosamente 🤍 ]\`*\n\n> _Se intentara reconectar en caso de desconexion de sesion_\n> _Si quieres eliminr el subbot borra la sesion en dispositivos vinculados_\n> _El número del bot puede cambiar, guarda este enlace :_\n\nhttps://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y', m)
        await sleep(5000)
        if (args[0]) {
          return
        }
        await parentw.reply(conn.user.jid, "La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin escanear otro código *QR*", m, rcanal)
        await parentw.reply(conn.user.jid, usedPrefix + command + " " + Buffer.from(fs.readFileSync(`${folderSub}/creds.json`), 'utf-8').toString('base64'), m, rcanal)
      }
    }

    const timeoutId = setTimeout(() => {
        if (!conn.user) {
            try {
                conn.ws.close()
            } catch {}
            conn.ev.removeAllListeners()
            let i = global.conns.indexOf(conn)
            if (i >= 0) {
                delete global.conns[i]
                global.conns.splice(i, 1)
            }
            fs.rmdirSync(`./serbot/${serbotFolder}`, { recursive: true })
        }
    }, 30000)

    let handler = await import("../handler.js")

    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) {
          handler = Handler
        }
      } catch (e) {
        console.error(e)
      }
      if (restatConn) {
        try {
          conn.ws.close()
        } catch {}
        conn.ev.removeAllListeners()
        conn = makeWASocket(connectionOptions)
        isInit = true
      }
      if (!isInit) {
        conn.ev.off("messages.upsert", conn.handler)
        conn.ev.off("connection.update", conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
      }
      conn.handler = handler.handler.bind(conn)
      conn.connectionUpdate = connectionUpdate.bind(conn)
      conn.credsUpdate = saveCreds.bind(conn, true)

      conn.ev.on("messages.upsert", conn.handler)
      conn.ev.on("connection.update", conn.connectionUpdate)
      conn.ev.on("creds.update", conn.credsUpdate)
      isInit = false
      return true
    }
    creloadHandler(false)
  }
  serbot()
}

handler.help = ["serbotqr"]
handler.tags = ["serbot"]
handler.command = ['serbotqr', 'qrbot', 'qr', 'serbot']

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}