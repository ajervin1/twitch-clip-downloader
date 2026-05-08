import fs from "fs";
import {SAVED_CLIPS_FILE} from "../config.js";

/**
 * Load clips from disk once
 */
export function loadSavedClips() {
    return JSON.parse(
        fs.readFileSync(SAVED_CLIPS_FILE, "utf-8")
    );
}

/**
 * Save clips back to disk once
 */
export function saveSavedClips(savedClips) {
    fs.writeFileSync(
        SAVED_CLIPS_FILE,
        JSON.stringify(savedClips, null, 2)
    );
}

/**
 * Add a clip if not already saved
 */
export function saveClip(savedClips, clip) {
    const date = new Date(clip.createdAt);
    const dateString =
        date.toDateString() +
        " " +
        date.toLocaleTimeString();


    savedClips.push({
        id: clip.id,
        title: clip.title,
        displayDate: dateString,
        createdAt: clip.createdAt,
        durationSeconds: clip.durationSeconds,
        mp4Url: clip.mp4Url,
    });

    // newest first
    savedClips.sort((a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
    // Sync to disk immediately
    fs.writeFileSync(
        SAVED_CLIPS_FILE,
        JSON.stringify(savedClips, null, 2)
    );

}