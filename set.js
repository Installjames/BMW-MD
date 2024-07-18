const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUJFU0h2U0dkMHRQaDRxTHY2aldadGwyZ0FtVjVkWnVTK1IrQSszajZGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjFSQ3U3Vzl6SmF3UVhRd3daNjl1ekRUMkh0czhXU2NQd0V2Z0NrUFdBND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySjdlbzhrOE4wYkFORDRRRDRlT3VPSzRWWDhKTjNsWkF6OG5wYm5DbDBBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzYlB1dm5wRWJBQmw3RVBqOXZTMFJsSG5QVHNaVHJxTXZDNVl2b29CN1g4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1HLzVqQ2N4SEtkelk2WE8xcTA2M29mSWdZcitNN2tnWGlNWDhPcWJmMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZMbTlnZDAwR0xyQ1o3RkdrOEdKd0YxOVRjUXp2OVVKdm1VTUJhMVc0eFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktDY2VwU0wySDEvVk1lMWxNcWE5SzNhWEttckJmcUV5MXVhVnM3algwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNm93UlJ5TzFMUm4yMmErVWs2aWU2aHVKRGFURnM2VUVHUGRTT2h4eWV6Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko0QWU3dXYySG9zbUc0K3ZZczBEeDdQUVc0V3hUUXJWbFdXOUZtMHhTWmtoUFdkSGxTakxaVVloZUxOZVNCcmZ0c056Rnc1ZmZ2UVp2bkk2UFhIbWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiJEQjVTYzMvdGhFUUVYRTB1ZnB3ZTkzTnZEdVRpbVVQdGVuclpaNFI2eGNzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMjcyMzc1MDZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDc4M0M2Q0UyNjZBRDY3RjczNUY1REFENUVBMEJGMkUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTI4NDY2MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiU3RMWnM5OUpRanVMVG44Rms0SkJGdyIsInBob25lSWQiOiIzN2VlNTcwNS03YjI4LTRjNzgtYTQ5Ny1lNWVjM2ZiNTRlMjciLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWhGUE9rMWhCRGEvVkdtaCtFdFRLdndBT0E0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFPVFQ5b2c4QlREU1pkVTkzSTdEU2grVXMraz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJUUUNZWFk0VCIsIm1lIjp7ImlkIjoiMjM0OTEyNzIzNzUwNjozN0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTkRJbWNZRkVLUHc0clFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM3VJN2hjbjFub1BJSXJiS2RZMHNNQ29rUDVuZGFHdmN3dEZ3OCtDZHcyWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY1h3b1BrNklweUR2SFBUbTRpUEw1a2xMRGdxUk1aYjc0TjFFb2lKM29kU2dyWlphVHZJT3l6NUU3UlBxUktuWXRSUDR6YUtOMEZVN21hQTFibnhHRGc9PSIsImRldmljZVNpZ25hdHVyZSI6Ind5ekZ0NGthRWJuaUN6aktMaUU4TWlvd3ViQ0xNRjVrZ2xYSE81Rnp1UUhYeXJudkxZUDI1VDRvYnJnZWhRbjdlc2FqUGFOT3hyL01ZbjFqbkNDWWhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTEyNzIzNzUwNjozN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkN2lPNFhKOVo2RHlDSzJ5bldOTERBcUpEK1ozV2hyM01MUmNQUGduY05tIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMjg0NjU2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNjeiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ProfessorBotz",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349127237506",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'EMMYBOTZ-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
