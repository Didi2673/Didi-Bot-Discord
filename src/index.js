const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, Intents } = require("discord.js");
const { token } = require("../config.json");

console.log("ça marche");

process.on("exit", (code) => {
    console.log("le processus s'est arreter :" + code);
});

process.on("uncaughtException", (err, origin) => {
    console.log("UNCAUGHT_EXCEPTION:" + err, "orrigine:" + origin);
});

process.on("unhandledRejection", (reason, promise) => {
    console.log("unhandled Rejection : " + reason, "promise:" + promise);
});

process.on("warning", (...args) => console.log(...args));


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,             // Pour les serveurs, salons, rôles et fils
        GatewayIntentBits.GuildMessages,      // Pour écouter la création/suppression de messages
        GatewayIntentBits.MessageContent,     // Pour lire le contenu (XP et logs de modification)
        GatewayIntentBits.GuildMembers,       // Pour les entrées/sorties et changements de rôles/boosts
        GatewayIntentBits.GuildModeration,    // Pour les bans et unbans
        GatewayIntentBits.GuildVoiceStates,   // Pour les logs de salons vocaux
        GatewayIntentBits.GuildWebhooks,      // Optionnel : utile pour certains logs avancés
        GatewayIntentBits.GuildMessageReactions // Optionnel : pour les logs de réactions
    ],
});
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}



client.login(token);