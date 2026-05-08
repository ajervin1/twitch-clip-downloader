import path from "path";
import "dotenv/config";

const BASE_DIR = import.meta.dirname;

export const DOWNLOAD_DIR = path.join(BASE_DIR, "downloads");
export const SAVED_CLIPS_FILE = path.join(BASE_DIR, "saved-clips.json");

// Environment Variables
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
export const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
