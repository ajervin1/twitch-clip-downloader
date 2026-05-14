import TelegramBot from "node-telegram-bot-api";
import fs from "fs";
import {TELEGRAM_TOKEN} from "../config.js";

process.env.NTBA_FIX_350 = true;
const bot = new TelegramBot(TELEGRAM_TOKEN, {
    polling: false,
});
// const CHAT_ID = "@stpeachclips";
const CHAT_ID = "@pokimane_clips";

/**
 * Sends a video file to the Telegram channel with streaming support.
 * @param {string} filePath - Path to the mp4 file.
 * @param {string} caption - Text to display with the video.
 */
export async function sendVideo(filePath, caption) {
    console.log(`📤 Sending video to ${CHAT_ID}...`);

    const stream = fs.createReadStream(filePath);

    const result = await bot.sendVideo(CHAT_ID, stream, {
        caption,
        supports_streaming: true,
    });

    console.log("✅ Video sent");
    console.log()
    return result;
}

