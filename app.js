import {getUserClips} from "./twitch/getUserClips.js";
import fs from "fs";

function saveClip(clip) {
    const savedClips = JSON.parse(fs.readFileSync("saved-clips.json", "utf-8"))
    const isSaved = savedClips.some(savedClip => savedClip.id === clip.id)
    if (!isSaved) {
        const date = new Date(clip.createdAt)
        const dateString = date.toDateString() + " " + date.toLocaleTimeString();
        console.log("Saving clip")
        savedClips.push({
            id: clip.id,
            title: clip.title,
            displayDate: dateString,        // Readable format
            timestamp: clip.createdAt,      // Original ISO format for sorting
            durationSeconds: clip.durationSeconds,
            mp4Url: clip.mp4Url,
        })

        // Sort: Newest first based on the original timestamp
        savedClips.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    } else {
        console.log("Already saved")
    }
    fs.writeFileSync("saved-clips.json", JSON.stringify(savedClips, null, 2))
}


async function main() {
    const {clips} = await getUserClips("stpeach", "LAST_WEEK", 10);
    console.log(clips.length)
    for (const clip of clips) {
        saveClip(clip);
    }
}

main()
