const config = require('../setting')
const { cmd, commands } = require('../lib/command')
const fs = require('fs')

const fg = require('api-dylux');
const yts = require(`ytsearch-venom`)

const { mediafireDl } = require('mfiredlcore-vihangayt')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')


const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )





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

// MEDIAFIRE DOWNLOAD COMMAND

const aapilink = 'https://dark-yasiya-api-new.vercel.app'


cmd({
    pattern: "mfire",
    alias: ["mf","mediafire"],
    react: "🔥",
    desc: "",
    category: "download",
    use: '.mfire < mediafire url >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{
  
if(!q) return await reply("Please give me mediafire url");
  if(!q.includes('mediafire.com')) return await reply("This url is invalid");
  
const mfire = await fetchJson(`${aapilink}/download/mfire?url=${q}`);
  
const msg = `
           🔥 *MEDIAFIRE DOWNLOADER* 🔥


• *File Name* - ${mfire.result.fileName}

• *File Size* - ${mfire.result.size}

• *Upload Date and Time* - ${mfire.result.date}

`
  
// SEND DETAILS
await conn.sendMessage( from, { image: { url: 'https://i.ibb.co/dPw1fHD/mfire.jpg' }, caption: msg }, { quoted: mek });

// SEND FILE
await conn.sendMessage(from, { document: { url: mfire.result.dl_link }, mimetype: mfire.result.fileType , fileName: mfire.result.fileName, caption: mfire.result.fileName }, { quoted: mek });

  
} catch (e) {
console.log(e)
reply('This url type is not working !!')
}
})




cmd({
  pattern: "fb",
  react: "🔓",
  category: "download",
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, prefix, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!args[0]) {
        throw ` Please send the link of a Facebook video\n\nEXAMPLE :\n *${prefix + command}* https://fb.watch/7B5KBCgdO3`;
    }

    const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
    if (!urlRegex.test(args[0])) {
        throw '⚠️ PLEASE GIVE A VALID URL.';
    }
     await reply(`Please wait...`);
    
        const result = await fg.fbdl(args[0]);
        const tex = `
  *Video Details* 
📽️ *Title*: ${result.title}
`;


        const response = await fetch(result.videoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const videoBuffer = Buffer.from(arrayBuffer);

        // Save the videoBuffer to a temporary file
        const randomName = `temp_${Math.floor(Math.random() * 10000)}.mp4`;
        fs.writeFileSync(`./${randomName}`, videoBuffer);

        // Send the video using client.sendMessage
        await conn.sendMessage(
            from,
            {
                video: fs.readFileSync(`./${randomName}`),
                caption: tex,
            },
            { quoted: mek }
        );

        fs.unlinkSync(`./${randomName}`);
    } catch (e) {
        console.log(e);
        reply('⚠️ An error occurred while processing the request. Please try again later.');
l(e)
}
})

cmd({
    pattern: "song",
    react: "🎧",
    desc: "download songs",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("please give me url or name🌍")
const search = await fetchJson(`${apilink}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${apilink}/download/ytmp3?url=${data.url}`)
    

let desc = `
───────➢───────
 🎧 *𝕄𝕀ℤ𝕌𝕂𝕀 𝕄𝔻 𝕊𝕆ℕ𝔾 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ* 🎧
┋🚨 *Youtube Player* ✨
  ╼━━━━━➢━━━━━━╾
┋🗒️ *Title:* ${data.title}

┋⏳ *Duration:* ${data.timestamp}
┋🧬 *description:* ${data.description}
┋👀 *Viewers:* ${data.views}
┋📤 *Uploaded:* ${data.ago}
┋🧑‍🎤 *Author:* ${data.author.name}
┋⬇️ Upload To Song
 ───────➢────────
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//===========================download audio===================================

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio + document message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"© ᴹᴬᴰᴱ ᴮʸ ᴰᴬᴿᴷ ᶜʸᴮᴱᴿ"},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})


//================================video-dl=====================================



cmd({
    pattern: "video",
    react: "📽️",
    desc: "download videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("please give me url or name🌍")
const search = await yts(q)
const data = search.videos[0];
const url = data.url


let desc = `


───────➢───────
 🎧 *𝕄𝕀ℤ𝕌𝕂𝕀 𝕄𝔻 𝕍𝕀𝔻𝔼𝕆 𝔻𝕆𝕎ℕ𝕃𝕆𝔸𝔻𝔼ℝ* 🎧
┋🚨 *Youtube Player* ✨
  ╼━━━━━➢━━━━━━╾
┋🗒️ *Title:* ${data.title}

┋⏳ *Duration:* ${data.timestamp}
┋👀 *Viewers:* ${data.views}
┋📤 *Uploaded:* ${data.ago}
┋🧑‍🎤 *Author:* ${data.author.name}
┋⬇️ Upload To Song
 ───────➢────────

`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//==========================download video===================================

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video + document message

await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})

await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"© ᴹᴬᴰᴱ ᴮʸ ᴰᴬᴿᴷ ᶜʸᴮᴱᴿ"},{quoted:mek})


}catch(e){
console.log(e)
reply(`${e}`)
}
})

