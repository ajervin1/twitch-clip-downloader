import path from "path";

const BASE_DIR = import.meta.dirname;

export const DOWNLOAD_DIR = path.join(BASE_DIR, "downloads");
export const SAVED_CLIPS_FILE = path.join(BASE_DIR, "saved-clips.json");
