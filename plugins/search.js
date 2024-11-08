const config = require('../setting')
const { cmd, commands } = require('../lib/command')
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const wabetainfo = require("@sasmeee/wabetainfo");

var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
const Esana = require('@sl-code-lords/esana-news');
var api = new Esana()

var tmsg =''
if(config.LANG === 'SI') tmsg = 'එය whatsapp beta news ලබා දෙයි.'
else tmsg = "It gives whatsapp beta news."




cmd({
    pattern: "esananews",
    react: '🎙️',
    desc: "To see esana news",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const latst = await api.latest_id();
            const nws = latst.results.news_id
            let nn = q || nws
            const ress = await api.news(nn);
            const res = ress.results;

            const txt2 = await conn.sendMessage(from, {image: 
	    {url: res.COVER},caption: `\n*┃◉* *⇨ ᴛɪᴛᴇʟ :*
 ${res.TITLE}\n\n*┃◉* *⇨ ᴅᴀᴛᴇ :*
 ${res.PUBLISHED}\n\n*┃◉* *⇨ ᴜʀʟ :*
 ${res.URL}\n\n*┃◉* *⇨ Description :*
 ${res.DESCRIPTION}\n\n*𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙼𝙸𝚉𝚄𝙺𝙸 𝙼𝙳®*\n\n`},
			{ quoted: mek });
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       


cmd({
    pattern: "slsub",
    react: "📃",
    alias: ["srisub"],
    desc: "Search Sinhala Subtitles  from Web Site",
    category: "download",
    use: '.slsub',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!q) return reply("❗ *Please enter movie name to download Subtitles*")
const duka = await subsearch(q)
const latest = await subdl(duka.results[0].link)
const maru =`\`*𝗠𝗜𝗭𝗨𝗞𝗜 𝗠𝗗 𝗦𝗜𝗡𝗛𝗔𝗟𝗔 𝗦𝗨𝗕 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥*\`

📊 \`*Movie Title\` - ${latest.results.title}*

🔒 \`Creator\` - ${latest.results.creater}

🖇️ _\`Link_\` - ${duka.results[0].link}

`
  await conn.sendMessage(from,{image:{url: latest.results.img },caption: maru + "*ᴍʀ-ᴋᴀꜱᴜɴ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*" },{quoted:mek })
  await conn.sendMessage(from, { document : { url : latest.results.dl_link  }  ,caption: latest.results.title ,mimetype: 'application/zip', fileName: `${latest.results.title}.zip` }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
})
}

cmd({
    pattern: "slsubsearch",
    react: "🔎",
    desc: "Search All Subtitles  from Web Site",
    category: "search",
    use: '.technewsall',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!q) return reply("❗ *Please enter movie name to Search Subtitles*")
const vid = await subsearch(q)
    let yt = '\n❍⚯────────────────────⚯❍\n        🌐  *𝚂𝙻 𝚂𝚄𝙱 𝚂𝙴𝙰𝚁𝙲𝙷 𝙻𝙸𝚂𝚃*  🌐\n ⚡ *ᴍʀ-ᴋᴀꜱᴜɴ ꜱʟ ꜱᴜʙᴛɪᴛʟᴇ ꜱᴇᴀʀᴄʜᴇʀ* ⚡\n❍⚯────────────────────⚯❍\n\n\n'
    for (let i of vid.results ) {
        yt += `📃 *${i.no} - ${i.title}*\n🔗 _Link : ${i.link}_ \n\n\n`
    }
 await conn.sendMessage(from,{image:{url: "https://telegra.ph/file/ba8ea739e63bf28c30b37.jpg" },caption: yt + "*Qᴜᴇᴇɴ-ɪᴢᴜᴍɪ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴇᴅ"},{quoted:mek})
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "wabeta",
    alias: ["wabetainfo","betawa"],
    react: "✔️",
    desc: tmsg,
    category: "search",
    use: '.wabeta',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const data = (await fetchJson('https://vihangayt.me/details/wabetainfo')).data
let info = `*🥏 Title :* ${data.title}
*📅 Date :* ${data.date}
*🖥️ Platform :* ${data.platform}
*🔗 URL :* ${data.url}
*🗞️ Short Desc :*
${data.shortdesc}

*ℹ️ FAQ*

*❓ Question :* ${data.faq[0].question}
*👨🏻‍💻 Answer :* ${data.faq[0].answer}

*❓ Question :* ${data.faq[1].question}
*👨🏻‍💻 Answer :* ${data.faq[1].answer}

*❓ Question :* ${data.faq[2].question}
*👨🏻‍💻 Answer :* ${data.faq[2].answer}

*❓ Question :* ${data.faq[3].question}
*👨🏻‍💻 Answer :* ${data.faq[3].answer}

*📰 Full Desc :*
${data.fulldesc}`
return await conn.sendMessage(from, { image: { url: data.image} , caption: info } , { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
})
}

// NEW ADDED NEWS SITE [ BBC , LANKADEEPA ]

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================LANKADEEPA NEWS========================================

cmd({
    pattern: "lankadeepanews",
    alias: ["lankadeepa","news4"],
    react: "🕵️‍♂️",
    desc: "",
    category: "search",
    use: '.lankadeepanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/lankadeepa`)
  
const msg = `
           \`🕵️‍♂️ *LANKADEEPA NEWS* 🕵️‍♂️\`

       
\`• *Title*\` - ${news.result.title}

\`• *News*\` - ${news.result.desc}

\`• *Date*\` - ${news.result.date}

\`• *Link*\` - ${news.result.url}`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================BBC NEWS========================================

cmd({
    pattern: "bbcnews",
    alias: ["bbc","news5"],
    react: "⛩",
    desc: "",
    category: "search",
    use: '.bbcnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/bbc`)
  
const msg = `
           \`⛩ *BBC NEWS* ⛩\`

       
\`• *Title*\` - ${news.result.title}

\`• *News*\` - ${news.result.desc}

\`• *Link*\` - ${news.result.url} `


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})


const apilink3 = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================HIRU NEWS========================================

cmd({
    pattern: "hirunews",
    alias: ["hiru","news1"],
    react: "⭐",
    desc: "",
    category: "search",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink3}/hiru`)
  
const msg = `
           \`⭐ *HIRU NEWS* ⭐\`

       
\`• *Title*\` - ${news.result.title}

\`• *News*\` - ${news.result.desc}

\`• *Link*\` - ${news.result.url}`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================SIRASA NEWS========================================

cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "🔺",
    desc: "",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink4}/sirasa`)
  
const msg = `
           \`🔺 *SIRASA NEWS* 🔺\`

       
\`• *Title*\` - ${news.result.title}

\`• *News*\` - ${news.result.desc}

\`• *Link*\` - ${news.result.url} `


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================DERANA NEWS========================================

cmd({
    pattern: "derananews",
    alias: ["derana","news3"],
    react: "📑",
    desc: "",
    category: "search",
    use: '.derana',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply}) => {
try{

const news = await fetchJson(`${apilink3}/derana`)
  
const msg = `
          \`📑 *DERANA NEWS* 📑\`

       
\`• *Title*\` - ${news.result.title}

\`• *News*\` - ${news.result.desc}

\`• *Date*\` - ${news.result.date}

\`• *Link*\` - ${news.result.url} `


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================BBC NEWS========================================

cmd({
    pattern: "bbcnews",
    alias: ["bbc","news5"],
    react: "⛩",
    desc: "",
    category: "news",
    use: '.bbcnews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/bbc`)
  
const msg = `
           ⛩ *BBC NEWS* ⛩

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url} `


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
        pattern: "google",
        react: "🌐",
        alias :['search','gsearch'],
        category: "search",
        desc: "Sends info of given query from Google Search.",
        use: '<text>',
        filename: __filename,
    },
    async(Void, citel, text) => {
        if (!text) return citel.reply(`give me a query\n*Example : .google Who is Suhail Tech.*`);
        let google = require('google-it');
        google({ 'query': text}).then(res => {
            let msg= `Mizuki Md Google Search From : ${text} \n\n`;
            for (let g of res) {
                msg+= `➣ Title : ${g.title}\n`;
                msg+= `➣ Description : ${g.snippet}\n`;
                msg+= `➣ Link : ${g.link}\n\n────────────────────────\n\n`;
            }
         
            return citel.reply(msg);
        })
    }
)

