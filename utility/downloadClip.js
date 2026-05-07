import fs from "fs";
import path from "path";

import {DOWNLOAD_DIR} from "../config.js";

/**
 * Downloads a Twitch clip to disk.
 */
export async function downloadClip(clip) {

    // Create downloads folder if missing
    if (!fs.existsSync(DOWNLOAD_DIR)) {
        fs.mkdirSync(DOWNLOAD_DIR);
    }

    const filePath = path.join(
        DOWNLOAD_DIR,
        `${clip.id}.mp4`
    );

    console.log(`⬇️ Downloading: ${clip.title}`);
    const response = await fetch(clip.mp4Url);
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(
        filePath,
        Buffer.from(arrayBuffer)
    );
    console.log(`✅ Downloaded: ${filePath}`);
    return filePath;
}