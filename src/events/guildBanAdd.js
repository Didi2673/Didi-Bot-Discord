// src/events/guildBanAdd.js
const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.GuildBanAdd,
    execute(ban) {
        sendLog(ban.guild, "🔨 Membre Banni", `**Utilisateur:** ${ban.user.tag} (${ban.user.id})`, "#8B0000");
    }
};