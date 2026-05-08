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

## Execution Flow

1. **Initialize** → Load saved clips from JSON database
2. **Fetch** → Query Twitch API for new clips
3. **Filter** → Check if clip already saved (avoid duplicates)
4. **Download** → Stream clip to `/downloads` folder
5. **Optimize** → Run FFmpeg to optimize video
6. **Distribute** → Send to Telegram
7. **Track** → Save clip metadata to `saved-clips.json`
8. **Cleanup** → Delete local download file

// ... existing code ...

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A Telegram Bot Token (if using the Telegram feature)
- Twitch Client ID (pre-configured in `twitch/getUserClips.js`)

## Future Improvements

### Core Features

- **Multiple Streamers**: Support tracking clips from multiple Twitch channels simultaneously with individual
  configurations.
- **Scheduled Execution**: Integrate `node-cron` to automatically run the clip fetcher on a configurable schedule (e.g.,
  every 6 hours).
- **Resume on Failure**: Implement a checkpoint system to resume processing from where the script left off if it crashes
  mid-execution.

### Monitoring & Logging

- **Error Notifications**: Send alerts via Telegram or email when the script encounters critical errors.
- **Performance Metrics**: Track download speeds, processing times, and storage usage.

### Distribution Options

- **YouTube Upload**: Automatically upload clips to a YouTube channel with metadata and descriptions.

### Code Quality

- **CI/CD Pipeline**: Implement GitHub Actions for automated testing and deployment.
- **Code Documentation**: Add JSDoc comments to all functions for better IDE support and maintainability.
- **Refactoring**: Reorganize codebase into `src/` folder structure (services, API, utils) for better scalability.

## TODO

- [x] Clone repository to aws account
- [ ] Implement auto run on ec2 server via node-cron or cron job
- [ ] Create `core` folder for code that orchestrates the application flow
- [ ] Add error handling with try/catch blocks
- [ ] Implement logging system for debugging and monitoring, implement discord
- [x] Add `.env.example` file with required environment variables
- [ ] Add Pagination support for Twitch API requests
- [ ] 
- [ ] Create GitHub Actions workflow for automated testing


