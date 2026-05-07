import {getUserClips} from "./twitch/getUserClips.js";
import fs from "fs";

function saveClip(clip) {
    const savedClips = JSON.parse(fs.readFileSync("saved-clips.json", "utf-8"))
    const isSaved = savedClips.some(savedClip => savedClip.id === clip.id)
    if (!isSaved) {
        console.log("Saving clip")
        savedClips.push(clip)
    } else {
        console.log("Already saved")
    }
    fs.writeFileSync("saved-clips.json", JSON.stringify(savedClips, null, 2))
}


async function main() {
    const {clips} = await getUserClips("stpeach", "LAST_WEEK", 50);
    console.log(clips.length)
    for (const clip of clips) {
        saveClip(clip);
    }
}

main()
