import {execSync} from "child_process";

/**
 * Optimizes mp4 for Telegram streaming.
 */
export function modifyClip(
    inputPath,
    outputPath
) {

    console.log("🎬 Optimizing video...");

    execSync(`
        ffmpeg -y \
        -i "${inputPath}" \
        -c:v copy \
        -c:a copy \
        -movflags +faststart \
        "${outputPath}"
    `);

    console.log("✅ Optimization complete");
}