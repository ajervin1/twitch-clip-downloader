import fs from "fs";
import {spawn} from "child_process";
import {DOWNLOAD_DIR} from "../config.js";
import path from "path";

export function optimizeVideo(input) {
    const ext = path.extname(input);
    const base = path.basename(input, ext);
    const output = path.join(DOWNLOAD_DIR, `${base}_optimized${ext}`);
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn("ffmpeg", [
            "-y",
            "-i",
            input,
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            output
        ]);

        ffmpeg.on("close", (code) => {
            code === 0
                ? resolve(output)
                : reject(new Error(`ffmpeg failed: ${code}`));
        });
    });
}