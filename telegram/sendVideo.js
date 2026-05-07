import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
process.env.NTBA_FIX_350 = true;
const bot = new TelegramBot(TELEGRAM_TOKEN, {
    polling: false,
});
const CHAT_ID = "@pokimane_clips";

/**
 * Sends a video file to the Telegram channel with streaming support.
 * @param {string} filePath - Path to the mp4 file.
 * @param {string} caption - Text to display with the video.
 */
export async function sendVideo(filePath, caption) {
    console.log(`📤 Sending video to ${CHAT_ID}...`);
    const stream = fs.createReadStream(filePath);
    return await bot.sendVideo(CHAT_ID, stream, {
        caption: caption,
        supports_streaming: true,
    });
}

