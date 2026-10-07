const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.ChannelUpdate,
    execute(channel) {
        if (!channel.guild) return;
        sendLog(channel.guild, "📁 Salon modifié", `Nom: **${channel.name}**\nType: ${channel.type}`, "#CCCC55");
    }
};