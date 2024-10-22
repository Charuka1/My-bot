
const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID||"eQ9TyYzS#B9x3lksI5m3r8tgJXYPw-RmZ1cca6AU5-s3yHAPa3ok",
MONGODB: process.env.MONGODB || "mongodb+srv://sam:sam@cluster0.u1smxsv.mongodb.net",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
//--------------------------------//--------------------------------//
OMDB_API_KEY: process.env.OMDB_API_KEY="76cb7f39",
OWNER_NAME: process.env.OWNER_NAME || "mr charuka",
BOT_NAME: process.env.BOT_NAME || "mizuki md",
FOOTER:process.env.FOOTER || "ᴍɪᴢᴜᴋɪ ᴍᴅ"
};