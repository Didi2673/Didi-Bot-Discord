const { EmbedBuilder } = require('discord.js');
const { getLogChannel } = require('./configManager');

async function sendLog(guild, title, description, color = '#7289da') {
    const channelId = getLogChannel(guild.id);
    if (!channelId) return;

    const channel = guild.channels.cache.get(channelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();

    await channel.send({ embeds: [embed] });
}

module.exports = { sendLog };