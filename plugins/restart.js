const config = require('../setting')
const {cmd , commands} = require('../lib/command')
const {sleep} = require('../lib/functions')

cmd({
    pattern: "restart",
    react: "♻",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const {exec} = require("child_process")
reply("restarting mizuki md...")
await sleep(1500)
exec("pm2 restart all")

}catch(e){
console.log(e)
reply(`${e}`)
}
})
