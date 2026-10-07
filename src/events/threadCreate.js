const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.ThreadCreate,
    execute(thread) {
        sendLog(thread.guild, "🧵 Fil Créé", `Nom: **${thread.name}**\nParent: ${thread.parent}`, "#5865F2");
    }
};
// Note: Tu peux créer threadDelete.js sur le même modèle.