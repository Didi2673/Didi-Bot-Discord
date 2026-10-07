const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member) {
        sendLog(member.guild, "📥 Nouveau Membre", `${member.user.tag} a rejoint le serveur.`, "#2ECC71");
    }
};