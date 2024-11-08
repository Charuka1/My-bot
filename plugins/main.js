const config = require('../setting')
const {cmd , commands} = require('../lib/command')
const os = require("os")
const{getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var desct =''
if(config.LANG === 'SI') desct = 'එය ඔබ ලබා දුන් දේ සඳහා chatgpt AI මත සොයයි.'
else desct = "It search on chatgpt ai for what you provided."
var needus =''
if(config.LANG === 'SI') needus = '*කරුණාකර මට chatgpt AI හි සෙවීමට වචන ලබා දෙන්න !*'
else needus = "*Please give me words to search on chatgpt ai !*" 
var cantf =''
if(config.LANG === 'SI') cantf = '*Server එක කාර්යබහුලයි. පසුව නැවත උත්සාහ කරන්න. !*'
else cantf = "*Server is busy. Try again later.!*"



cmd({
    pattern: "alive",
    react: "👋",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    
let cyber = `👋 HELLO ${pushname} I'm alive now
    
> *🚀Version:* ${require("../package.json").version}
> *⌛Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> *🕒Runtime:* ${runtime(process.uptime())}
> *📍Platform:* ${os.hostname()}


🐼This is the result of our teams hard work and our technical cybers team owns the bots rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances And 100 Commands And logo, thumbnail,banner Maker Commands Ai Chatbot feathers On Our Bot
                    
*🌻Have A Nice Day..*🌻


> ᴍɪᴢᴜᴋɪ ᴍᴅ ᴄʀᴇᴀᴛᴇ ʙʏ ᴅᴀʀᴋ ᴄʀᴇᴀᴛᴏʀꜱ
 ` 
	  

 await conn.sendMessage(from,{image:{url:"https://i.ibb.co/SsqGnFc/20240905-163614.jpg"},caption:cyber},{quoted:mek})



}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "menu1",
    react: "📂",
    alias: ["panel","list","commands"],
    desc: "Get bot\'s command list.",
    category: "main",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isSachintha, isSavi, isSadas, isMani, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    let menuc1 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'admin'){
if(!commands[i].dontAddCommandList){
menuc1 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc2 = ``
for (let i=0;i<commands.length;i++) { 
  if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){
  menuc2 += `*│⩥* .${commands[i].pattern}\n`
  }}};

let menuc3 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
    menuc3 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc4 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc4 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc5 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc5 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc6 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
if(!commands[i].dontAddCommandList){
  menuc6 += `*│⩥* .${commands[i].pattern}\n`
}}};


let menuc7 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
  menuc7 += `*│⩥* .${commands[i].pattern}\n`
}}};

let menuc8 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'anime'){
if(!commands[i].dontAddCommandList){
  menuc8 += `*│⩥* .${commands[i].pattern}\n`
}}};
let menumg = `*Hellow👸* ${pushname}

*╭─     ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*│🕵️‍♂️ 𝘙𝘶𝘯 𝘛𝘪𝘮𝘦 -* ${runtime(process.uptime())} 
*│🕵️‍♂️ 𝘙𝘢𝘮 𝘜𝘴𝘦 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
 │
*╰──────────●●►*
*👸 𝘔𝘪𝘻𝘶𝘬𝘪 𝘔𝘥 𝘊𝘰𝘮𝘮𝘢𝘮𝘥 𝘗𝘢𝘯𝘦𝘭*
*╭──────────●●►*
*│🧙‍♂️ ADMIN COMMANDS*
*│   ───────*

${menuc1}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ MAIN COMMANDS*
*│   ───────*

${menuc2}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ CONVERT COMMANDS*
*│   ───────*

${menuc3}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ SEARCH COMMANDS*
*│   ───────*

${menuc4}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ DOWNLOADE COMMANDS*
*│   ───────*

${menuc5}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ OWNER COMMANDS*
*│   ───────*

${menuc6}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ OWNER COMMANDS*
*│   ───────*

${menuc7}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ ANIME COMMANDS*
*│   ───────*

${menuc8}*╰───────────●●►*

*•ᴍɪᴢᴜᴋɪ ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ•*`
	    
      
await conn.sendMessage(from, { image: { url: "https://i.ibb.co/SsqGnFc/20240905-163614.jpg" }, caption: menumg }, { quoted:mek})
} catch (e) {
reply('*Menu Error !!*')
l(e)
}
})



cmd({
    pattern: "chatgpt",
    alias: ["ai","gpt","openai","zerotwo","chat"],
    react: '👾',
    desc: desct,
    category: "search",
    use: '.chatgpt ha',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
var res = ''
try{
res = (await fetchJson('https://vihangayt.me/tools/chatgpt?q=' + q)).data
} catch (e) {
try{
res = (await fetchJson('https://vihangayt.me/tools/chatgpt2?q=' + q)).data
} catch (e) {
res = (await fetchJson('https://vihangayt.me/tools/chatgpt3?q=' + q)).data
}
}

return await reply(res)
} catch (e) {
reply(cantf)
l(e)
}
})

cmd({
    pattern: "chatgpt4",
    alias: ["ai2","gpt4","openai4","zerotwo2","chat2"],
    react: '👾',
    desc: desct,
    category: "search",
    use: '.chatgpt4 ha',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
var res = (await fetchJson('https://chatgpt4.my.id/api/processdata?question=' + q)).response

return await reply(res)
} catch (e) {
reply(cantf)
l(e)
}
})                    
