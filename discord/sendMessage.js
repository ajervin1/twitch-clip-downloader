import dotenv from "dotenv";
import {DISCORD_CHANNEL_ID, DISCORD_TOKEN} from "../config.js";

export async function sendMessage(content) {
    const res = await fetch(
        `https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bot ${DISCORD_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content,
            }),
        }
    );

    return await res.json();
}