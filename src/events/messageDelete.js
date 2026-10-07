// src/events/messageDelete.js
const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.MessageDelete,
    execute(message) {
        if (!message.guild || message.author?.bot) return;
        sendLog(message.guild, "🗑️ Message Supprimé", `**Auteur:** ${message.author}\n**Salon:** ${message.channel}\n**Contenu:** ${message.content || "Inconnu/Image"}`, "#FF0000");
    }
};