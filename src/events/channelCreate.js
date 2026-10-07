const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.ChannelCreate,
    execute(channel) {
        if (!channel.guild) return;
        sendLog(channel.guild, "📁 Salon Créé", `Nom: **${channel.name}**\nType: ${channel.type}`, "#2ECC71");
    }
};
// Répète pour Events.ChannelDelete avec une couleur rouge.