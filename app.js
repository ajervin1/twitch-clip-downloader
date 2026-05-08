import {getUserClips} from "./twitch/getUserClips.js";
import {loadSavedClips} from "./utility/fileManager.js";

export const CHANNEL = "stpeach";
export const CLIP_FILTER = "LAST_WEEK";
export const CLIP_LIMIT = 100;
import {processClips} from "./core/processClips.js";


async function main() {
    try {
        const savedClips = loadSavedClips();
        const {clips} = await getUserClips(CHANNEL, CLIP_FILTER, CLIP_LIMIT);
        if (clips.length === 0) {
            const msg = `❓ No clips found for ${CHANNEL} in the ${CLIP_FILTER} timeframe.`;
            console.log(msg);
            return;
        }
        const newClips = clips.filter(clip => !savedClips.some(savedClip => savedClip.id === clip.id));
        const totalFound = clips.length;
        const newCount = newClips.length;
        if (newCount === 0) {
            const msg = `ℹ️ Checked ${totalFound} clips for ${CHANNEL}, but they have all been processed already.`;
            console.log(msg);
            return;
        }
        console.log(`🚀 Found ${newCount} new clips for ${CHANNEL}. Starting processing...`);
        await processClips(newClips, savedClips);
        console.log(`✅ Successfully processed all ${newCount} new clips for ${CHANNEL}.`);

    } catch (error) {
        const errorDetail = `🚨 CRITICAL ERROR ON EC2\n` +
            `Channel: ${CHANNEL}\n` +
            `Message: ${error.message}\n` +
            `${error.stack}`;

        console.error(errorDetail);
    }
}


main();