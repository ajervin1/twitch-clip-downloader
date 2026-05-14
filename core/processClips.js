import {downloadClip} from "../utility/downloadClip.js";
import {saveClip} from "../utility/fileManager.js";
import fs from "fs";
import {sendVideo} from "../telegram/sendVideo.js";
import {optimizeVideo} from "../ffmpeg/optimizeVideo.js";

/**
 * Processes a list of clips: downloads, sends to Telegram, and saves to database.
 */
export async function processClips(clips, savedClips) {
    for (const clip of clips) {

        const filePath = await downloadClip(clip);
        const caption = `🎬 ${clip.title}`;

        const msg = await sendVideo(filePath, caption);

        console.log("Telegram Response ID:", msg.message_id);

        saveClip(savedClips, clip);
        console.log(`🗑️ Deleted local file: ${filePath}`);
    }
}
