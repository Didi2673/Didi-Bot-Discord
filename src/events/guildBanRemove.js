const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.GuildBanRemove,
    execute(ban) {
        sendLog(ban.guild, "🔓 Membre Débanni", `**Utilisateur:** ${ban.user.tag}`, "#00FF00");
    }
};