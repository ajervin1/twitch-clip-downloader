# Twitch Clip Downloader & Manager

A Node.js application designed to fetch, track, and manage Twitch clips from specific streamers. It uses Twitch's GQL
API to retrieve clip data, formats it for readability, and maintains an ordered local database. It also includes
integrated support for sending clips to a Telegram channel.

## Features

- **Clip Fetching**: Retrieves clips from specified Twitch channels (e.g., "stpeach") using the GQL API.
- **Smart Tracking**: Saves clip metadata to `saved-clips.json` and prevents duplicates based on Clip ID.
- **Human-Readable Metadata**: Automatically formats UTC timestamps into a readable Arizona-based timezone string (e.g.,
  `Wed May 06 2026 6:55:03 PM`).
- **Auto-Sorting**: Maintains the local JSON database in chronological order (newest clips always at the top).
- **Telegram Integration**: Optional functionality to upload saved clips directly to a Telegram channel/bot.

## Project structure

- `app.js` – Entry point; fetches clips and saves new ones.
- `twitch/getUserClips.js` – Fetches clip data from Twitch GQL and maps it to a simplified object.
- `twitch/buildSignedUrl.js` – Appends playback access token/signature to the clip source URL.
- `saved-clips.json` – Local metadata store of saved clips.
- `telegram/sendVideo.js` – Helper to send a local MP4 file to Telegram.
- `ffmpeg/optimizeVideo.js` – Helper to optimize MP4 metadata placement for streaming.
- `utility/fileManager.js` – Helper containing clip download logic.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A Telegram Bot Token (if using the Telegram feature)
- Twitch Client ID (pre-configured in `twitch/getUserClips.js`)



