import {fetchClips} from "../twitch/getUserClips.js";

async function downloadClip(clip) {
    console.log(`⏳ Starting download: ${clip.title}`); // ✅ Correct
    const response = await fetch(clip.mp4Url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
}

function getClipIds() {
    const json = fs.readFileSync(DOWNLOAD_FILE, 'utf-8');
    const clipIdsArray = JSON.parse(json);
    return clipIdsArray;
}

function addClipId(clipId) {
    const existingIds = getClipIds();
    const idsSet = new Set(existingIds);
    idsSet.add(clipId);
    const updatedIds = Array.from(idsSet);
    const jsonIds = JSON.stringify(updatedIds, null, 2);
    fs.writeFileSync(DOWNLOAD_FILE, jsonIds);
    return updatedIds;
}

/* Clip Service */
function filterNewClips(clipIds, clips) {
    const newClips = clips.filter(clip => !clipIds.includes(clip.id))
    return newClips;
}