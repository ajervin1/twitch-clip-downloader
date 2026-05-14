import {loadSavedClips} from "../utility/fileManager.js";
import {getUserClips} from "../twitch/getUserClips.js";
import {sendMessage} from "../discord/sendMessage.js";
import {processClips} from "./processClips.js";

export const CHANNEL = "stpeach";
export const CLIP_FILTER = "LAST_WEEK";
export const CLIP_LIMIT = 2;

export async function checkAndProcessClips() {
    const savedClips = loadSavedClips();
    const {clips} = await getUserClips(CHANNEL, CLIP_FILTER, CLIP_LIMIT);
    const totalFound = clips.length;

    if (totalFound === 0) {
        const msg = `❓ No clips found for ${CHANNEL} in the ${CLIP_FILTER} timeframe.`;
        await sendMessage(msg);
        return;
    }

    const newClips = clips.filter(clip => !savedClips.some(savedClip => savedClip.id === clip.id));

    if (newClips.length === 0) {
        const msg = `ℹ️ Checked ${totalFound} clips for ${CHANNEL}, but they have all been processed already.`;
        await sendMessage(msg);
        return;
    }

    await processClips(newClips, savedClips);
}