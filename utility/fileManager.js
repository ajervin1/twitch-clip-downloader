async function downloadClip(clip) {
    console.log(`⏳ Starting download: ${clip.title}`); // ✅ Correct
    const response = await fetch(clip.mp4Url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
}
