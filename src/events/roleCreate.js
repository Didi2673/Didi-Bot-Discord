const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.RoleCreate,
    execute(role) {
        sendLog(role.guild, "🛡️ Rôle Créé", `Nom: **${role.name}**\nID: ${role.id}`, "#3498DB");
    }
};
// Répète pour Events.RoleDelete.