const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.MessageUpdate,
    execute(oldMessage, newMessage) {
        if (oldMessage.author?.bot || oldMessage.content === newMessage.content) return;
        sendLog(oldMessage.guild, "📝 Message Modifié", 
            `**Auteur:** ${oldMessage.author}\n**Salon:** ${oldMessage.channel}\n\n**Ancien:**\n${oldMessage.content}\n\n**Nouveau:**\n${newMessage.content}`, "#FFA500");
    }
};