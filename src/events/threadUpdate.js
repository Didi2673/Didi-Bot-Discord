const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.ThreadUpdate,
    execute(thread) {
        sendLog(thread.guild, "🧵 Fil modifié", `Nom: **${thread.name}**\nParent: ${thread.parent}`, "#FFFF00");
    }
};