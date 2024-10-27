const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
let needus = "*Please give me a fb url!*" 

//==========================================for button users==============================================

cmd({
    pattern: "fb",    
    alias: ["facebook","fb","fbdl"],
    react: '🌀',
    desc: "Download fb videos",
    category: "download",
    use: '.fb < fb url >',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
  
  if (!q) return await reply('TEXT') 
      if (!q.includes('Facebook')) return await reply('valid_url') 


const mov = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    
let mala = `乂 *FB- D O W N L O A D E R*

    *◦ Title:* ${mov.result.desc}
`
                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: config.BTN,
                        url: config.BTNURL,
                        merchant_url: config.BTNURL
                    }),
                },
                { name: 'single_select',
            buttonParamsJson: JSON.stringify({
               title: 'Tap Here!',
               sections: [{
                  rows: [{
                     title: 'DOWNLOAD VIDEO SD QUALITY',
                     // description: `X`,
                     id: prefix + `xdl ${mov.result.video_sd}`
                  }, {
                     title: 'DOWNLOAD VIDEO HD QUALITY',
                     // description: `X`,
                     id: prefix + `xdl ${mov.result.video_hd}`
                  }, {
                     title: 'DOWNLOAD AUDIO',
                     // description: `X`,
                     id: prefix + `xmp3 ${mov.result.audio}`
		  }]
               }]
            })
         }]
	

        let message = {
            image: mov.result.thumb,
            header: '',
            footer: config.FOOTER,
            body: mala
        }   
return conn.sendButtonMessage(from, buttons, m, message) 
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
//===========================================================================
cmd({
    pattern: "fbdl",
    react: '💫',
    dontAddCommandList: true,
    use: '.fbdl <fb link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(needus)
let wm = config.FOOTER
await conn.sendMessage(from, { video: { url: q }, caption: wm}, { quoted: mek })
await conn.sendMessage(from, { react: { text: '✅', key: mek.key }})
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
//==============================================================================

cmd({
    pattern: "fbmp3",
    react: '💫',
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply(needus)
let cap = config.FOOTER
conn.sendMessage(from , { audio : { url : q  }, caption: cap},mimetype: 'audio/mpeg' } , { quoted: mek })
} catch (e) {
reply('*Error !!*')
console.log(e)
}
})




//-------- *For Button Users* --
