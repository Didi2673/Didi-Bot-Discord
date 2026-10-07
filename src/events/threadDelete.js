const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.ThreadDelete,
    execute(thread) {
        sendLog(thread.guild, "🧵 Fil supprimé", `Nom: **${thread.name}**\nParent: ${thread.parent}`, "#FF0000");
    }
};