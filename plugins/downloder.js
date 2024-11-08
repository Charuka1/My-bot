const config = require('../setting')
const { cmd, commands } = require('../lib/command')
const fs = require('fs')

const fg = require('api-dylux');
const ytsearch = require(`ytsearch-venom`)

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
           
        \`*乂* 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 *乂*\`


• \`*Title*\` - ${tiktok.result.title}

• \`*Author*\` - ${tiktok.result.author}

• \`*Duration*\` - ${tiktok.result.duration}

• \`*Views*\` - ${tiktok.result.views}   
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
           \`🔥 *MEDIAFIRE DOWNLOADER* 🔥\`


• \`*File Name*\` - ${mfire.result.fileName}

• \`*File Size*\` - ${mfire.result.size}

• \`*Upload Date and Time*\` - ${mfire.result.date}

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
//============================================================
const appilink = 'https://dark-yasiya-api-new.vercel.app'


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
const search = await fetchJson(`${appilink}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${appilink}/download/ytmp3?url=${data.url}`)
    

let desc = `
*\`✦ 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ✦\`*
 
*\`➤ 𝗧𝗶𝘁𝗹𝗲:\`* ${data.title}

*\`➤ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:\`* ${data.timestamp}

*\`➤ 𝗩𝗶𝗲𝘄𝗲𝗿𝘀:\`* ${data.views}

*\`➤ 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:\`* ${data.ago}

*\`➤𝗔𝘂𝘁𝗵𝗼𝗿:\`* ${data.author.name}

⬇️ *\`𝚄𝙿𝙻𝙾𝙳𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 𝚂𝙾𝙽𝙶...\`*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//===========================download audio===================================

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio + document message
let bb = await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from, { react: { text: '✅', key: bb.key }})
let ss = await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"© ᴹᴬᴰᴱ ᴮʸ ᴰᴬᴿᴷ ᶜʸᴮᴱᴿ"},{quoted:mek})
await conn.sendMessage(from, { react: { text: '✅', key: ss.key }})
}catch(e){
console.log(e)
reply(`${e}`)
}
})


//================================video-dl=====================================

const appilink3 = 'https://dark-yasiya-api-new.vercel.app'


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
const search = await fetchJson(`${appilink3}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${appilink3}/download/ytmp4?url=${data.url}`)
    


let desc = `

*\`✦ 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ✦\`*
 
*\`➤ 𝗧𝗶𝘁𝗹𝗲:\`* ${data.title}

*\`➤ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:\`* ${data.timestamp}

*\`➤ 𝗩𝗶𝗲𝘄𝗲𝗿𝘀:\`* ${data.views}

*\`➤ 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:\`* ${data.ago}

*\`➤𝗔𝘂𝘁𝗵𝗼𝗿:\`* ${data.author.name}

⬇️ *\`𝚄𝙿𝙻𝙾𝙳𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 𝚅𝙸𝙳𝙾𝙴...\`*


`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//==========================download video===================================

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video + document message

let mg = await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from, { react: { text: '✅', key: mg.key }})

let send = await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"© ᴹᴬᴰᴱ ᴮʸ ᴰᴬᴿᴷ ᶜʸᴮᴱᴿ"},{quoted:mek})
await conn.sendMessage(from, { react: { text: '✅', key: send.key }})

}catch(e){
console.log(e)
reply(`${e}`)
}
})



const apilink8 = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )



cmd({
    pattern: "xvideo",
    alias: ["xvdl","xvdown"],
    react: "🔞",
    desc: "Download xvideo.com porn video",
    category: "download",
    use: '.xvideo < text >',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply, q }) => {
try{

  if(!q) return await reply("Please give me few word !")
    
const xv_list = await fetchJson(`${apilink}/search/xvideo?q=${q}`)
if(xv_list.result.length < 0) return await reply("Not results found !")

const xv_info = await fetchJson(`${apilink8}/download/xvideo?url=${xv_list.result[0].url}`)
    
  // FIRST VIDEO
  
const msg = `
           \`🔞 *XVIDEO DOWNLOADER* 🔞\`

       
\`• *Title*\` - ${xv_info.result.title}

\`• *Views*\` - ${xv_info.result.views}

\`• *Like*\` - ${xv_info.result.like}

\`• *Deslike*\` - ${xv_info.result.deslike}

\`• *Size*\` - ${xv_info.result.size}
`


await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO
await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });


} catch (error) {
console.log(error)
reply(error)
}
})


