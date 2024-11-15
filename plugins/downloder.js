const config = require('../setting')
const { cmd, commands } = require('../lib/command')
const fs = require('fs')

const fg = require('api-dylux');
const yts = require('yt-search');
const ytsearch = require(`ytsearch-venom`)

const { mediafireDl } = require('mfiredlcore-vihangayt')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')



// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//fb downloader
cmd({
    pattern: "fb",
    desc: "Download fb videos",
    category: "download",
    react: "📥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Facebook video URL!");
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        let desc = ` *❖ DARK-NETHU-MD FB DOWNLOADER ❖*

💻  Github:https://github.com/project-wabot/DARK-NETHU-MD

*🌟 Choose Your Download Quality*

*1 Download HD Quality*
*2 Download SD Quality*

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ`;

        const vv = await conn.sendMessage(from, { image: { url:"ඔයාගේ img එකේ url එක දෙන්න"}, caption: desc }, { quoted: mek });
        
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ*" }, { quoted: mek });
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ɴᴇᴛʜᴍɪᴋᴀ ᴍᴀɪɴ*" }, { quoted: mek });
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
           
        *\`乂 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 乂\`*


•*\`*Title\`* - ${tiktok.result.title}

•*\`*Author\`* - ${tiktok.result.author}

•*\`Duration\`* - ${tiktok.result.duration}

•*\`Views\`* - ${tiktok.result.views} 

🔢 Reply Below Number

*1.1| WATERMARK VIDEO TYPE*
*2.2| NO WATERMARK VIDEO TYPE*
*3.3| AUDIO TYPE*
`






	
// SEND DETAILS
const vv = await conn.sendMessage( from, { image: { url: tiktok.result.cover || '' }, caption: msg }, { quoted: mek });


conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        await conn.sendMessage(from, { video: { url: tiktok.result.wmVideo }, mimetype: "video/mp4", caption: `${tiktok.result.title}\n\nWATERMARK VIDEO ✅` }, { quoted: mek });
                        break;
                    case '2.2':               
                    await conn.sendMessage(from, { video: { url: tiktok.result.hdVideo }, mimetype: "video/mp4", caption: `${tiktok.result.title}\n\nNO-WATERMARK VIDEO ✅` }, { quoted: mek });
                        break;
                    case '3.3':
                        await conn.sendMessage(from, { audio: { url: tiktok.result.sound }, mimetype: "audio/mpeg" }, { quoted: mek });
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
  pattern: "fb2",
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
     await reply(`\`𝗙𝗕 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘\`
        🔢 Reply Below Number 


	1| 𝗦𝗗 𝗤𝗨𝗔𝗟𝗜𝗧𝗬
        2| 𝗛𝗗 𝗤𝗨𝗔𝗟𝗜𝗧𝗬

 *ᴘᴏᴡᴇʀᴅ ʙʏ ᴍʀ ᴄʜᴀʀᴜᴋᴀ*`);
    
        const result = await fg.fbdl(args[0]);
        const tex = `
  *\`Video Details\`* 
📽️ *Title*: ${result.title}
`;


        const response = await fetch(result.videoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const videoBuffer = Buffer.from(arrayBuffer);

        // Save the videoBuffer to a temporary file
        const randomName = `temp_${Math.floor(Math.random() * 10000)}.mp4`;
        fs.writeFileSync(`./${randomName}`, videoBuffer);

        // Send the video using client.sendMessage
        await conn.sendMessage(from,{video: fs.readFileSync(`./${randomName}`),caption: tex,},{ quoted: mek });

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
const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
    
const ytdl = await fetchJson(`${appilink}/download/ytmp3?url=${data.url}`)
    

let desc = `
*\`❍ 𝗦𝗢𝗡𝗚 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ❍\`*
 
*\`➤ 𝗧𝗶𝘁𝗹𝗲:\`* ${data.title}

*\`➤ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:\`* ${data.timestamp}

*\`➤ 𝗩𝗶𝗲𝘄𝗲𝗿𝘀:\`* ${data.views}

*\`➤ 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:\`* ${data.ago}

*\`➤ 𝗔𝘂𝘁𝗵𝗼𝗿:\`* ${data.author.name}

🔢 Reply Below Number

*1.0| Audio Type 🎧*
*1.1| Document Type 📁*
`
const vv = await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//===========================download audio===================================

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.0':
                        let down = await fg.yta(url);
                        let downloadUrl = down.dl_url;
                        let ms = await conn.sendMessage(from, { audio: { url:downloadUrl }, caption: '*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴄʜᴀʀᴜᴋᴀ*', mimetype: 'audio/mpeg'},{ quoted: mek });
			  await conn.sendMessage(from, { react: { text: '✅', key: ms.key } })
                        break;
                    case '1.1':               
                        // Send Document File
                        let downdoc = await fg.yta(url);
                        let downloaddocUrl = downdoc.dl_url;
                        let mg = await conn.sendMessage(from, { document: { url:downloaddocUrl }, caption: '*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴄᴄʜᴀʀᴜᴋᴀ*', mimetype: 'audio/mpeg', fileName:data.title + ".mp3"}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mg.key } })
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

*\`❍ 𝗩𝗜𝗗𝗘𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ❍\`*
 
*\`➤ 𝗧𝗶𝘁𝗹𝗲:\`* ${data.title}

*\`➤ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻:\`* ${data.timestamp}

*\`➤ 𝗩𝗶𝗲𝘄𝗲𝗿𝘀:\`* ${data.views}

*\`➤ 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗱:\`* ${data.ago}

*\`➤ 𝗔𝘂𝘁𝗵𝗼𝗿:\`* ${data.author.name}

🔢 Reply Below Number

*0.1| Audio Type 📽️*
*1.1| Document Type 📁*
`
const vv = await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//==========================download video===================================


        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '0.1':
                        let down = await fg.ytv(url);
                        let downloadUrl = down.dl_url;
                        let ms = await conn.sendMessage(from, { video: { url:downloadUrl }, caption: '*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴄʜᴀʀᴜᴋᴀ*', mimetype: 'video/mp4'},{ quoted: mek });
			  await conn.sendMessage(from, { react: { text: '✅', key: ms.key } })
                        break;
                    case '1.1':               
                        // Send Document File
                        let downdoc = await fg.ytv(url);
                        let downloaddocUrl = downdoc.dl_url;
                        let mg = await conn.sendMessage(from, { document: { url:downloaddocUrl }, caption: '*ᴘᴀᴡᴇʀᴇᴅ ʙʏ ᴍʀ ᴄᴄʜᴀʀᴜᴋᴀ*', mimetype: 'video/mp4', fileName:data.title + ".mp4"}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mg.key } })
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

cmd({
    pattern: "0.1",
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
    
let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video + document message

let md = await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from, { react: { text: '✅', key: md.key }})
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
           *\`🔞 XVIDEO DOWNLOADER 🔞\`*

       
*\`• Title\`* - ${xv_info.result.title}

*\`• Views\`* - ${xv_info.result.views}

*\`• Like\`* - ${xv_info.result.like}

*\`• Deslike*\`* - ${xv_info.result.deslike}

*\`• Size\`* - ${xv_info.result.size}

🔢 Reply Below Number

*1| Video Type📽️*
*2| Document Type📁*

`


const vv = await conn.sendMessage( from, { image: { url: xv_info.result.image || '' }, caption: msg }, { quoted: mek })

// SEND VIDEO



   conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':                      	
                     await conn.sendMessage(from, { document: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });
                     break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: xv_info.result.dl_link }, mimetype: "video/mp4", fileName: xv_info.result.title, caption: xv_info.result.title }, { quoted: mek });
		     break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react
: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});

	



