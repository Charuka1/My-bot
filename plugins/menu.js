//========= alive command ===========
const config = require('../setting')
const {cmd , commands} = require('../lib/command')



//============= menu command ================

const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
}

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📃",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `*👋 Hello ${pushname}*

*╭═「 ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ 」*
*│◈ ʀᴜɴᴛɪᴍᴇ :* ${runtime(process.uptime())}
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ ʙᴏᴛ ɴᴀᴍᴇ :* ᴍɪᴢᴜᴋɪ ᴍᴅ
*╰════════════════○●►*
*╭────────────────○●►*
*┃「 𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗 𝗠𝗘𝗡𝗨 𝗟𝗜𝗦𝗧 」*
*╰────────────────○●►*
*╭────────────────○●►*
*╎ \`🔢REPLY BELOW MENU NUMBER\`*
*╎ 01 OWNER*
*╎ 02 CONVERT*
*╎ 03 AI*
*╎ 04 SEARCG*
*╎ 05 DOWNLOAD* 
*╎ 06 FUN*
*╎ 07 MAIN*
*╎ 08 GROUP*
*╰────────────────○●►*
*╎ \`ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍɪᴢᴜᴋɪ ᴍᴅ\`*
*└────────────────◒◒►*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://iili.io/29wAvDu.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        reply(`*◈╾──NETHU OWNER MENU──╼◈*

╭────────●●►
│ • *restart* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                        break;
                    case '2':               
                        reply(`*◈╾──NETHU CONVERT MENU──╼◈*

╭────────●●►
│ • *convert* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                        break;
                    case '3':               
                        reply(`*◈╾──NETHU AI MENU──╼◈*

╭────────●●►
│ • *ai* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                        break;
                    case '4':               
                        reply(`*◈╾──NETHU SEARCH MENU──╼◈*

╭────────●●►
│ • *yts* 
╰──────────────────●●►
╭────────●●►
│ • *srepo* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                        break;
                    case '5':               
                        reply(`*◈╾──NETHU DOWNLOAD MENU──╼◈*

╭────────●●►
│ • *apk* 
╰──────────────────●●►
╭────────●●►
│ • *twitter* 
╰──────────────────●●►
╭────────●●►
│ • *gdrive* 
╰──────────────────●●►
╭────────●●►
│ • *mediafire* 
╰──────────────────●●►
╭────────●●►
│ • *fb* 
╰──────────────────●●►
╭────────●●►
│ • *ig* 
╰──────────────────●●►
╭────────●●►
│ • *movie* 
╰──────────────────●●►
╭────────●●►
│ • *song* 
╰──────────────────●●►
╭────────●●►
│ • *video* 
╰──────────────────●●►
╭────────●●►
│ • *play/yt* 
╰──────────────────●●►
╭────────●●►
│ • *song2* 
╰──────────────────●●►
╭────────●●►
│ • *video2* 
╰──────────────────●●►
╭────────●●►
│ • *tiktok* 
╰──────────────────●●►
╭────────●●►
│ • *img* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                        break;
                    case '7':               
                        reply(`*◈╾──NETHU MAIN MENU──╼◈*

╭────────●●►
│ • *alive* 
╰──────────────────●●►
╭────────●●►
│ • *about* 
╰──────────────────●●►
╭────────●●►
│ • *menu* 
╰──────────────────●●►
╭────────●●►
│ • *allmenu* 
╰──────────────────●●►
╭────────●●►
│ • *support* 
╰──────────────────●●►
╭────────●●►
│ • *system* 
╰──────────────────●●►
╭────────●●►
│ • *ping* 
╰──────────────────●●►
╭────────●●►
│ • *runtime* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                        break;
                    case '8':               
                        reply(`*◈╾──NETHU GROUP MENU──╼◈*

╭────────●●►
│ • *promote* 
╰──────────────────●●►
╭────────●●►
│ • *demote* 
╰──────────────────●●►
╭────────●●►
│ • *kick* 
╰──────────────────●●►
╭────────●●►
│ • *add* 
╰──────────────────●●►
╭────────●●►
│ • *admins* 
╰──────────────────●●►
╭────────●●►
│ • *tagall* 
╰──────────────────●●►
╭────────●●►
│ • *getpic* 
╰──────────────────●●►
╭────────●●►
│ • *setwelcome* 
╰──────────────────●●►
╭────────●●►
│ • *setgoodbye* 
╰──────────────────●●►
╭────────●●►
│ • *admins* 
╰──────────────────●●►
╭────────●●►
│ • *gname* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);
                       break;
                    case '6':               
                        reply(`*◈╾──NETHU FUN MENU──╼◈*

╭────────●●►
│ • *dog* 
╰──────────────────●●►
╭────────●●►
│ • *fact* 
╰──────────────────●●►
╭────────●●►
│ • *hack* 
╰──────────────────●●►
╭────────●●►
│ • *quote* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);

                        break;
                    case '9':               
                        reply(`*◈╾──NETHU OTHER MENU──╼◈*

╭────────●●►
│ • *githubstalk* 
╰──────────────────●●►
╭────────●●►
│ • *trt* 
╰──────────────────●●►
╭────────●●►
│ • *weather* 
╰──────────────────●●►

*💻 Github :* https://github.com/project-wabot/DARK-NETHU-MD

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`);


                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
//======================= system command =====================

cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    react: "⚙️",
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `┌────────────────────
├\`⏰ Uptime\`:-  ${runtime(process.uptime())}
├\` 📟 Ram usage\`:-  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├\`⚙️ Platform\`:-  ${os.hostname()}
├\`👨‍💻 Owners\`:- charuka ofc
├\`🧬 Version\`:- 1.0.0
└─────────────────────
`
return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=================== ping command =======================


cmd({
    pattern: "ping",
    react: "📟",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isSachintha, isSavi, isSadas, isMani, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '```Pinging!!!```'  }, { quoted: mek, messageId:genMsgId() } )
var final = new Date().getTime();
await conn.sendMessage(from, { edite: ping.key })
return await conn.sendMessage(from , { text: '*Pong*\n *' + (final - inital) + ' ms* '  }, { quoted: mek ,messageId:genMsgId()} )
} catch (e) {
reply('*Error !!*')
l(e)
}
})

//================ run time ======================

cmd({
    pattern: "status",
    alias: ["runtime","botinfo"],
    desc: "check up time",
    category: "main",
    react: "⏰",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{ 

let status =` *🚀 Runtime:-  ${runtime(process.uptime())}* `
return reply(`${status}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})

//================= abio command ========================

cmd({

    pattern: "about",

    desc: "To get the bot informations.",

    react: "ℹ️",

    category: "main",

    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{



let about = ` *👋 𝗛𝗘𝗟𝗟𝗢 𝗧𝗛𝗘𝗜𝗥 ${senderNumber}*

              𝐈 𝐀𝐌 𝐃𝐀𝐑𝐊-𝐍𝐄𝐓𝐇𝐔-𝐌𝐃 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓

              𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐍𝐄𝐓𝐇𝐌𝐈𝐊𝐀 𝐌𝐀𝐈𝐍...
              
             
*ʏᴏᴜᴛᴜʙᴇ :* https://www.youtube.com/@SlNethuMax
      
*ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ :* https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A

              
> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`

return await conn.sendMessage(from,{image: {url: `https://iili.io/29wAvDu.jpg`},caption:about},{quoted: mek})

}catch(e){

console.log(e)

reply(`${e}`)

}

})

//====================== support command ===================


cmd({

    pattern: "support",

    desc: "To get the bot informations.",

    react: "⛓",

    category: "main",

    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{



let about = ` *👋 Hello ${pushname}*

*❖ DARK-NETHU-MD Support Channels ❖*

*Youtube Channel Link:* https://www.youtube.com/@SlNethuMax

*Whatsapp Channel Link:* https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A


> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`

return await conn.sendMessage(from,{image: {url: `https://iili.io/29wAvDu.jpg`},caption:about},{quoted: mek})

}catch(e){

console.log(e)

reply(`${e}`)

}

})

//==================== all menu command =====================

cmd({
    pattern: "allmenu",
    desc: "To get the menu.",
    react: "📜",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
ai: '',
tools: '',
search: '',
fun: '',
voice: '',
other: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}

let madeMenu = `
👋 𝐇𝐄𝐋𝐋𝐎, ${pushname}!

❖ 𝐃𝐀𝐑𝐊 𝐍𝐄𝐓𝐇𝐔 𝐌𝐃 ❖
╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ 」
│◈ яυηтιмє * ${runtime(process.uptime())}
│◈ σωηєя ηαмє * ɴᴇᴛʜᴍɪᴋᴀ
│◈ σωηєя ηυмвєя * 94718913389
╰──────────●●►
╭──────────●●►
 📥 *𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.download}
╰───────────●●►
╭──────────●●►
 👾 *𝐀𝐢 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.ai}
╰───────────●●►
╭──────────●●►
 🔧 *𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.main}
╰───────────●●►
╭──────────●●►
 🎉 *𝐅𝐮𝐧 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.fun}
╰───────────●●►
╭──────────●●►
 🔄 *𝐂𝐨𝐧𝐯𝐞𝐫𝐭 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.convert}
╰───────────●●►
╭──────────●●►
 🔍 *𝐒𝐞𝐚𝐫𝐜𝐡 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.search}
╰───────────●●►
╭──────────●●►
 👥 *𝐆𝐫𝐨𝐮𝐩 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.group}
╰───────────●●►
╭──────────●●►
 🔒 *𝐎𝐰𝐧𝐞𝐫 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.owner}
╰───────────●●►
╭──────────●●►
 ⚙️ *𝐎𝐭𝐡𝐞𝐫 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.other}
╰───────────●●►
╭──────────●●►
 🛠️ *𝐓𝐨𝐨𝐥𝐬 𝐌𝐞𝐧𝐮*
  ───────
 ${menu.tools}
╰───────────●●►


> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`

return await conn.sendMessage(from,{image: {url: `https://iili.io/29wAvDu.jpg`},caption:madeMenu},{quoted: mek})
}catch(e){
console.log(e)
reply(`𝔼𝕣𝕣𝕣𝕠𝕣`)
}
})






