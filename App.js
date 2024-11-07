import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import Seats from './Routers/Router-Seats.js';
import Users from './Routers/Router-Users.js';
import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
// הגדרת dotenv
dotenv.config();
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN; 
const CHAT_ID = process.env.CHAT_ID;     
const SERVER_URL = process.env.SERVER_URL; 

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

async function keepAlive() {
  try {
      const response = await fetch(SERVER_URL);
      if (response.ok) {
        await bot.sendMessage(CHAT_ID, '🟢 השרת פעיל ומגיב!');
      } else {
        await bot.sendMessage(CHAT_ID, `🔴 השרת מגיב אבל עם שגיאה: ${response.status}`);
      }
  } catch (error) {
      console.error('Server check failed:', error);
      await bot.sendMessage(CHAT_ID, `⚠️ אזהרה: בעיה בשרת\n${error.message}`);
  }
}

bot.onText(/\/status/, async (msg) => {
  try {
      const response = await fetch(SERVER_URL);
      if (response.ok) {
          await bot.sendMessage(msg.chat.id, '🟢 השרת פעיל ומגיב!');
      } else {
          await bot.sendMessage(msg.chat.id, `🔴 השרת מגיב אבל עם שגיאה: ${response.status}`);
      }
  } catch (error) {
      await bot.sendMessage(msg.chat.id, `🔴 השרת לא מגיב: ${error.message}`);
  }
});
bot.onText(/\/chatid/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Your Chat ID is: ${chatId}`);
});


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// הוסף את התיקייה הסטטית
app.use('/uploads', express.static('uploads'));

// הגדרות middleware
app.use(express.json({ limit: "10mb" })); 
app.use(cors());

// הגדרת המסלולים
app.use('/', Seats);
app.use('/users', Users);
app.get('/status', (req, res) => {
  res.status(200).send('Server is running');
});

// התחלת השרת
cron.schedule('*/5 * * * *', keepAlive);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`השרת פועל על פורט ${port}`);
    // הודעה בהפעלת השרת
    bot.sendMessage(CHAT_ID, `🚀 השרת עלה לאוויר על פורט ${port}!`)
        .catch(console.error);
});
export default app;
