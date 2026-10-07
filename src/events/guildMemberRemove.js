const { Events } = require('discord.js');
const { sendLog } = require('../utils/logger');

module.exports = {
    name: Events.GuildMemberRemove,
    execute(member) {
        sendLog(member.guild, "📤 Départ", `${member.user.tag} a quitté le serveur (ou a été kick).`, "#E74C3C");
    }
};