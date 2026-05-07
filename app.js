import {getUserClips} from "./twitch/getUserClips.js";
import {downloadClip} from "./utility/downloadClip.js";
import {sendVideo} from "./telegram/sendVideo.js";
import {loadSavedClips, saveClip, saveSavedClips} from "./utility/fileManager.js";

export const CHANNEL = "stpeach";
export const CLIP_FILTER = "LAST_WEEK";
export const CLIP_LIMIT = 15;
import fs from "fs";

async function main() {
    const savedClips = loadSavedClips();
    const {clips} = await getUserClips(
        CHANNEL,
        CLIP_FILTER,
        CLIP_LIMIT
    );
    if (clips.length === 0) {
        console.log(
            `No clips found for ${CHANNEL} in the ${CLIP_FILTER} timeframe.`
        );
        return;
    }
    for (const clip of clips) {
        const isSaved = savedClips.some(savedClip => savedClip.id === clip.id);

        if (!isSaved) {
            // Download first
            const filePath = await downloadClip(clip);
            // 2. Send to Telegram
            const caption = `🎬 ${clip.title}\n\nStreamer: ${CHANNEL}`;
            const msg = await sendVideo(filePath, caption);
            console.log("Telegram Response ID:", msg.message_id);
            console.log("Telegram File ID:", msg.video.file_id);
            // Save to memory
            saveClip(savedClips, clip);
            // Delete the file from the downloads folder
            fs.unlinkSync(filePath);
            console.log(`🗑️ Deleted local file: ${filePath}`);

        } else {
            console.log(`Skipping ${clip.id} (already saved)`);
        }
    }

    saveSavedClips(savedClips);

}

main();