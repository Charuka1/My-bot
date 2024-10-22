const config = require('../setting')
const { cmd, commands } = require('../command')
const fg = require('api-dylux');
const { mediafireDl } = require('mfiredlcore-vihangayt')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')	




cmd({
    pattern: "img",
    react: '👾',
    desc: 'to down images',
    category: "download",
    use: '.img',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    
    if (!q) throw `Example: ${prefix + command} Bike`

    let gis = require('g-i-s')
    gis(q, async (error, result) => {
        if (error) {
            console.error('Error fetching images:', error);
		
            return reply('Error fetching images. Please try again later.')
        }

        const topImages = result.slice(0, 5); // Extract top 5 images

        for (let i = 0; i < topImages.length; i++) {
            const imageUrl = topImages[i].url
          let Message = {
              image: { url: imageUrl },caption: `*-------「 IMAGE SEARCH 」-------*\n🤠*Image ${i + 1}`,
           }

//let senda = await conn.sendMessage(from, { document: {url: imageUrl },fileName: 'image' + '.jpg', mimetype: 'image/jpeg' ,caption: `*-------「 MIZUKI MD GIMAGE SEARCH 」-------*\n🤠 *Query* : ${q}\n\n🔗 *Image ${i + 1} Url* : ${imageUrl}`,}, { quoted: mek })  
		
            conn.sendMessage(from, Message, { quoted: mek })
        }
    })
} catch (e) {
l(e)
}
})

cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: '📁',
    desc: "Download mediafire files.",
    category: "download",
    use: '.mediafire <mediafire link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await  reply('*Please give me google drive url*')
if (!q.includes('mediafire.com')) return await  reply('*Please give me google drive url*')
if (!q.includes('/file')) return await  reply('*Please give me google drive url*')
const baby1 = await mediafireDl(q)
if(baby1.size.includes('MB') && baby1.size.replace('MB','') > config.MAX_SIZE) return await  reply('*This file is too big !!*')
if(baby1.size.includes('GB')) return await  reply('*This file is too big !!*')
const mfile = conn.sendMessage(from, { document : { url : baby1.link}, fileName : baby1.name, mimetype: baby1.mime,caption: `*🧸 Name* : ${baby1.name}
*📊 Size* : ${baby1.size}
*🕹️ Mime* : ${baby1.mime}`}, {quoted: mek})	
await conn.sendMessage(from, { react: { text: '📁', key: mfile.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})

// TIKTOK DOWNLOAD COMMAND

const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )


cmd({
    pattern: "tiktok",
    alias: ["tt","ttdown"],
    react: "🍧",
    desc: "",
    category: "download",
    use: '.tiktok < url >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{
  
if(!q) return await reply("Please give me tiktok url");
  if(!q.includes('tiktok.com')) return await reply("This url is invalid");
  
const tiktok = await fetchJson(`${apilink}/download/tiktok?url=${q}`);
  
const msg = `
           🍧 *TIKTOK DOWNLOADER* 🍧


• *Title* - ${tiktok.result.title}

• *Author* - ${tiktok.result.author}

• *Duration* - ${tiktok.result.duration}

• *Views* - ${tiktok.result.views}   
`
  
// SEND DETAILS
await conn.sendMessage( from, { image: { url: tiktok.result.cover || '' }, caption: msg }, { quoted: mek });

// SEND WATER MARK VIDEO
await conn.sendMessage(from, { video: { url: tiktok.result.wmVideo }, mimetype: "video/mp4", caption: `${tiktok.result.title}\n\nWATERMARK VIDEO ✅` }, { quoted: mek });
  
// SEND HD VIDEO
await conn.sendMessage(from, { video: { url: tiktok.result.hdVideo }, mimetype: "video/mp4", caption: `${tiktok.result.title}\n\nNO-WATERMARK VIDEO ✅` }, { quoted: mek });
  
// SEND AUDIO
await conn.sendMessage(from, { audio: { url: tiktok.result.sound }, mimetype: "audio/mpeg" }, { quoted: mek });

  
} catch (e) {
console.log(e)
reply(e)
}
})

