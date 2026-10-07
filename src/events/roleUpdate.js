const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.RoleUpdate,
    execute(role) {
        sendLog(role.guild, "🛡️ Rôle modifié", `Nom: **${role.name}**\nID: ${role.id}`, "#3498DB");
    }
};
// Répète pour Events.RoleDelete.