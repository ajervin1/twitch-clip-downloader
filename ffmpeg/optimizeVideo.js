import fs from "fs";

function optimizeVideo(input, output) {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn("ffmpeg", [
            "-y",
            "-i",
            input,
            "-c",
            "copy",
            "-movflags",
            "+faststart",
            output,
        ]);

        ffmpeg.on("close", (code) => {
            code === 0
                ? resolve()
                : reject(new Error(`ffmpeg failed: ${code}`));
        });
    });
}