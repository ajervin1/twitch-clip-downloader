import {Client, GatewayIntentBits} from 'discord.js';
import {DISCORD_TOKEN} from "./config.js";
import {checkAndProcessClips} from "./core/checkAndProcessClips.js";

export function initDiscordBot() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
    });

    client.on('clientReady', async () => {
        console.log(`Logged in as ${client.user.tag}`);
        console.log("Bot is online!");
    });

    client.on('messageCreate', async (message) => {
        const args = message.content.trim().split(/\s+/);
        const command = args[0];
        // Ignore bot messages
        if (message.author.bot) return;

        if (message.content === '!ping') {
            await message.reply('Pong! 🏓');
        }
        if (message.content === '!twitch') {
            await checkAndProcessClips();
        }
    });

    client.login(DISCORD_TOKEN);
}

initDiscordBot()