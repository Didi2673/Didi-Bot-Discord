const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.RoleDelete,
    execute(role) {
        sendLog(role.guild, "🛡️ Rôle supprimé", `Nom: **${role.name}**\nID: ${role.id}`, "#3498DB");
    }
};
// Répète pour Events.RoleDelete.