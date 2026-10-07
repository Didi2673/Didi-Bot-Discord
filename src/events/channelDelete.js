const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.ChannelDelete,
    execute(channel) {
        if (!channel.guild) return;
        sendLog(channel.guild, "📁 Salon supprimé", `Nom: **${channel.name}**\nType: ${channel.type}`, "#CC2E33");
    }
};
// Répète pour Events.ChannelDelete avec une couleur rouge.