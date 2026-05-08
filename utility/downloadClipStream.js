import fs from "fs";
import path from "path";
import {Readable} from "stream";
import {finished} from "stream/promises";
import {DOWNLOAD_DIR} from "../config.js";

/**
 * Downloads a Twitch clip to disk using streams for efficiency.
 */
export async function downloadClipStream(clip) {
    if (!fs.existsSync(DOWNLOAD_DIR)) {
        fs.mkdirSync(DOWNLOAD_DIR);
    }

    const filePath = path.join(DOWNLOAD_DIR, `${clip.id}.mp4`);

    console.log(`⬇️ Downloading: ${clip.title}`);

    const response = await fetch(clip.mp4Url);
    if (!response.ok) throw new Error(`Failed to download clip: ${response.statusText}`);

    const fileStream = fs.createWriteStream(filePath);
    // Use Readable.fromWeb to pipe the fetch stream directly to the file
    await finished(Readable.fromWeb(response.body).pipe(fileStream));

    console.log(`✅ Downloaded: ${filePath}`);
    return filePath;
}