const config = require('../setting')
const axios = require('axios')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
const Esana = require('@sl-code-lords/esana-news');
var api = new Esana()



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
 ${res.DESCRIPTION}\n\n*𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙼𝚁 𝙼𝙸𝚉𝚄𝙺𝙸 𝙼𝙳 ®*\n\n`},
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
const maru =`*MIZUKI-MD SINHALA SUB DOWNLOADER*

📊 *Movie Title - ${latest.results.title}*

🔒 Creator - ${latest.results.creater}

🖇️ _Link_ - ${duka.results[0].link}

`
  await conn.sendMessage(from,{image:{url: latest.results.img },caption: maru + "*ᴍʀ-ᴋᴀꜱᴜɴ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*" },{quoted:mek })
  await conn.sendMessage(from, { document : { url : latest.results.dl_link  }  ,caption: latest.results.title ,mimetype: 'application/zip', fileName: `${latest.results.title}.zip` }, { quoted: mek })
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

// NEW ADDED NEWS SITE [ BBC , LANKADEEPA ]


const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================LANKADEEPA NEWS========================================

cmd({
    pattern: "lankadeepanews",
    alias: ["lankadeepa","news4"],
    react: "🕵️‍♂️",
    desc: "",
    category: "news",
    use: '.lankadeepanews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/lankadeepa`)
  
const msg = `
           🕵️‍♂️ *LANKADEEPA NEWS* 🕵️‍♂️

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Date* - ${news.result.date}

• *Link* - ${news.result.url}`


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

